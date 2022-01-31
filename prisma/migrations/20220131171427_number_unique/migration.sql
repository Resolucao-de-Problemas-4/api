/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `cartao` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cartao_numero_key" ON "cartao"("numero");
