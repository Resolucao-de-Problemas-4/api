/*
  Warnings:

  - Added the required column `idCorrida` to the `rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rating" ADD COLUMN     "idCorrida" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_idCorrida_fkey" FOREIGN KEY ("idCorrida") REFERENCES "race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
