/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Definition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "DefinitionVersion" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "bodyLatex" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "definitionId" INTEGER NOT NULL,
    "defaultMacroSetId" INTEGER,

    CONSTRAINT "DefinitionVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MacroSet" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT,
    "macros" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MacroSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MacroSet_uuid_key" ON "MacroSet"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Definition_title_key" ON "Definition"("title");

-- AddForeignKey
ALTER TABLE "DefinitionVersion" ADD CONSTRAINT "DefinitionVersion_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "Definition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefinitionVersion" ADD CONSTRAINT "DefinitionVersion_defaultMacroSetId_fkey" FOREIGN KEY ("defaultMacroSetId") REFERENCES "MacroSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
