/*
  Warnings:

  - Added the required column `title` to the `Definition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Definition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Definition" ADD COLUMN     "category" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
