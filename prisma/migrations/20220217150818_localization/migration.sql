/*
  Warnings:

  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_corridaID_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_driverID_fkey";

-- DropTable
DROP TABLE "location";

-- CreateTable
CREATE TABLE "Localization" (
    "ID" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "driverID" TEXT NOT NULL,
    "corridaID" TEXT NOT NULL,

    CONSTRAINT "Localization_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Localization_driverID_key" ON "Localization"("driverID");

-- CreateIndex
CREATE UNIQUE INDEX "Localization_corridaID_key" ON "Localization"("corridaID");

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_corridaID_fkey" FOREIGN KEY ("corridaID") REFERENCES "race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Localization" ADD CONSTRAINT "Localization_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
