/*
  Warnings:

  - You are about to drop the column `category` on the `Definition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Definition" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToDefinition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToDefinition_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "_CategoryToDefinition_B_index" ON "_CategoryToDefinition"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToDefinition" ADD CONSTRAINT "_CategoryToDefinition_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDefinition" ADD CONSTRAINT "_CategoryToDefinition_B_fkey" FOREIGN KEY ("B") REFERENCES "Definition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
