/*
  Warnings:

  - A unique constraint covering the columns `[corridaID]` on the table `location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `corridaID` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN     "corridaID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "location_corridaID_key" ON "location"("corridaID");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_corridaID_fkey" FOREIGN KEY ("corridaID") REFERENCES "race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
