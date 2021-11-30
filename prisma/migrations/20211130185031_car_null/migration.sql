/*
  Warnings:

  - A unique constraint covering the columns `[ownerCNH]` on the table `car` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "car_ownerCNH_key" ON "car"("ownerCNH");
