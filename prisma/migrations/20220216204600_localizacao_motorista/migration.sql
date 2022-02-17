-- CreateTable
CREATE TABLE "location" (
    "ID" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "driverID" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "location_driverID_key" ON "location"("driverID");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES "driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
