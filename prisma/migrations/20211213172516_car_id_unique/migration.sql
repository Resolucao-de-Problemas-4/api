/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `race` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "race_id_key" ON "race"("id");
