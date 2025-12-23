import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';
import { UUID } from 'node:crypto';

export async function definitionRoutes(fastify: FastifyInstance) {
  // get all default versions of definitions
  fastify.get('/definitions', async () => {
    const defs = await prisma.definition.findMany({
      include: {
        versions: {
          where: { isDefault: true },
          include: { defaultMacroSet: true },
        },
        categories: true,
      },
    });

    const cleanedDefs: ConcreteDefinition[] = defs.map((def) => {
      const defaultVersion = def.versions[0];
      return {
        title: def.title,
        categories: def.categories.map((category) => category.name),
        bodyLatex: defaultVersion?.bodyLatex || '',
        macros: (defaultVersion?.defaultMacroSet?.macros as Record<string, string>) || {},
        versionSlug: defaultVersion?.slug || '',
      };
    });

    return cleanedDefs;
  });

  // get a particular definition (e.g. prf)
  // can ask for a particular version or default version
  // can also ask for a particular macro set or default macro set
  fastify.get('/definitions/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const { version: versionSlug, macroSetId: macroUUID } = request.query as {
      version: string;
      macroSetId: UUID;
    };

    // fetch definition by title (e.g. prf)
    const definition = await prisma.definition.findUnique({
      where: { title: slug },
      include: { categories: true },
    });

    if (!definition) {
      return reply.code(404).send({
        error: `Definition ${slug} not found`,
      });
    }

    const query = {
      where: {
        definitionId: definition.id,
        // if we're looking for a specific defn. version (e.g. version=alt), get that.
        // otherwise, get default version
        ...(versionSlug ? { slug: versionSlug } : { isDefault: true }),
      },
      include: {
        defaultMacroSet: true,
      },
    };

    // fetch one particular definition version (e.g. prf, version=alt)
    const definitionVersion = await prisma.definitionVersion.findFirst(query);

    if (!definitionVersion) {
      return reply.code(404).send({
        error: `No default version found for definition ${slug}`,
      });
    }

    // also fetch all available versions for this definition
    const versionsMetadata = await prisma.definitionVersion.findMany({
      where: { definitionId: definition.id },
      select: { slug: true, order: true, isDefault: true },
      orderBy: { order: 'asc' },
    });

    let macroSet;
    if (macroUUID) {
      // a macroset is specified, try to find that one.
      macroSet = await prisma.macroSet.findUnique({ where: { uuid: macroUUID } });
      if (!macroSet) {
        return reply.code(404).send({
          error: `Macro set ${macroUUID} not found`,
        });
      }
    } else {
      // macroset is not specified, if this definitionversion has a defaultMacroSet use that.
      // otherwise, use no macros
      macroSet = definitionVersion.defaultMacroSet || { macros: {} };
    }

    const defResponse: ConcreteDefinition = {
      title: definition.title,
      categories: definition.categories.map((category) => category.name),
      versionSlug: definitionVersion.slug,
      bodyLatex: definitionVersion.bodyLatex,
      macros: (macroSet?.macros as Record<string, string>) || {},
      versions: versionsMetadata,
    };

    return defResponse;
  });

  // post a new type of definition (e.g. prf) and create a default DefinitionVersion
  // (e.g. prf, default version)
  fastify.post('/definitions', async (request, reply) => {
    const { title, categories, bodyLatex, macros, versionSlug } =
      request.body as ConcreteDefinition;

    // check if definition with given title already exists
    const existing = await prisma.definition.findUnique({
      where: { title },
    });

    if (existing) {
      return reply.code(409).send({
        error: `Definition with title ${title} already exists`,
      });
    }

    // set up a new definition, make it a default version
    // (since none of this type of definition exists yet)
    const newDefData = {
      title,
      categories: {
        connectOrCreate: categories.map((category) => ({
          where: { name: category },
          create: { name: category },
        })),
      },
      versions: {
        create: {
          slug: versionSlug || 'default',
          bodyLatex,
          isDefault: true, // default version of definition
          defaultMacroSet: {
            create: {
              macros, // creates row in MacroSet table
            },
          },
        },
      },
    };

    try {
      // try creating new definition + a default version
      const newDef = await prisma.definition.create({
        data: newDefData,
        include: {
          categories: true,
          versions: {
            include: { defaultMacroSet: true },
          },
        },
      });
      return newDef;
    } catch (err: any) {
      // handle prisma unique constraint errors (race condition)
      if (err.code === 'P2002' && err.meta?.target?.includes('title')) {
        return reply.code(409).send({
          error: `Definition with title "${title}" already exists.`,
        });
      }

      // Unexpected error
      fastify.log.error(err);
      return reply.code(500).send({
        error: 'Unexpected server error.',
      });
    }
  });

  // add a new version to an existing definition
  // (e.g. to prf, add prf v2)
  fastify.post('/definitions/:title', async (request, reply) => {
    // title of definition we are creating a new version for
    const { title } = request.params as { title: string };

    // extract definitionVersion's fields
    const { slug, bodyLatex, macros } = request.body as {
      // maybe make slug unique??
      slug: string;
      bodyLatex: string;
      macros?: Record<string, string>;
    };

    // check if definition exists
    const existing = await prisma.definition.findUnique({
      where: { title },
      include: {
        versions: true,
      },
    });

    if (!existing) {
      return reply.code(404).send({
        error: `Definition with title ${title} not found`,
      });
    }

    // this new version comes last, so its order is the length of the array
    const newOrder = existing.versions.length;

    const baseVersionData = {
      slug,
      bodyLatex,
      order: newOrder,
      isDefault: false,
      // get the id of the existing definition
      definition: {
        connect: { id: existing.id },
      },
    };

    // if there's macros, add those on to the data, o/w just send the base data
    const newVersionData = macros
      ? {
          ...baseVersionData,
          defaultMacroSet: {
            create: {
              macros,
            },
          },
        }
      : baseVersionData;

    try {
      await prisma.definitionVersion.create({
        data: newVersionData,
        include: {
          defaultMacroSet: true,
        },
      });
    } catch (err: any) {
      // handle prisma unique constraint errors (race condition)
      if (err.code === 'P2002' && err.meta?.target?.includes('title')) {
        return reply.code(409).send({
          error: `Definition with title "${title}" already exists.`,
        });
      }

      // Unexpected error
      fastify.log.error(err);
      return reply.code(500).send({
        error: 'Unexpected server error.',
      });
    }
  });

  // // PUT update
  // fastify.put('/definitions/:id', async (request, reply) => {
  //   // LATER: think abt how versioning history comes in here
  //   const { id } = request.params as { id: string };
  //   const { title, category, bodyLatex } = request.body as any;
  //   const updated = await prisma.definition.update({
  //     where: {
  //       id: Number(id),
  //     },
  //     data: { title, category, bodyLatex },
  //   });

  //   return updated;
  // });

  // // Delete definition
  // fastify.delete('/definitions/:id', async (request, reply) => {
  //   const { id } = request.params as { id: string };

  //   await prisma.definition.delete({
  //     where: {
  //       id: Number(id),
  //     },
  //   });

  //   return {
  //     message: 'Deleted successfully',
  //   };
  // });
  // TODO: Macro set CRUD as well
}
