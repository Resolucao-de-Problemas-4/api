/*
  Warnings:

  - You are about to drop the column `HoraSolcitacao` on the `race` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[plate]` on the table `car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `horaSolicitacao` to the `race` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "race" DROP COLUMN "HoraSolcitacao",
ADD COLUMN     "corridaAceita" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "horaSolicitacao" TEXT NOT NULL,
ADD COLUMN     "valorViagem" DOUBLE PRECISION,
ALTER COLUMN "idDriver" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "car_plate_key" ON "car"("plate");
