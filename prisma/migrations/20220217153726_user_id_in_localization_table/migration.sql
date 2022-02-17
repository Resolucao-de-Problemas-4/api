/*
  Warnings:

  - You are about to drop the `Localization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Localization" DROP CONSTRAINT "Localization_corridaID_fkey";

-- DropForeignKey
ALTER TABLE "Localization" DROP CONSTRAINT "Localization_driverID_fkey";

-- DropTable
DROP TABLE "Localization";

-- CreateTable
CREATE TABLE "localization" (
    "ID" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "driverID" TEXT NOT NULL,
    "corridaID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "localization_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "localization_driverID_key" ON "localization"("driverID");

-- CreateIndex
CREATE UNIQUE INDEX "localization_corridaID_key" ON "localization"("corridaID");

-- CreateIndex
CREATE UNIQUE INDEX "localization_userID_key" ON "localization"("userID");

-- AddForeignKey
ALTER TABLE "localization" ADD CONSTRAINT "localization_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localization" ADD CONSTRAINT "localization_corridaID_fkey" FOREIGN KEY ("corridaID") REFERENCES "race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "localization" ADD CONSTRAINT "localization_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
