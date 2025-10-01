-- CreateTable
CREATE TABLE "Definition" (
    "id" SERIAL NOT NULL,
    "bodyLatex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Definition_pkey" PRIMARY KEY ("id")
);
