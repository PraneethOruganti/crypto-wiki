type Definition = {
  id: number;
  title: string;
  catgories: string[];
};

type DefinitionVersion = {
  versionSlug: string;
  bodyLatex: string;
  isDefault: boolean;
  macros: Record<string, string>;
};
type VersionMetadata = {
  slug: string;
  order: number;
  isDefault: boolean;
};

type ConcreteDefinition = {
  title: string;
  categories: string[];
  bodyLatex: string;
  macros: Record<string, string>;
  versionSlug: string;
  versions?: VersionMetadata[];
};
