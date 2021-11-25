/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `address` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CNH" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car" (
    "plate" TEXT NOT NULL,
    "ownerCNH" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "renavan" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "car_pkey" PRIMARY KEY ("plate")
);

-- CreateIndex
CREATE UNIQUE INDEX "driver_CNH_key" ON "driver"("CNH");

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_ownerCNH_fkey" FOREIGN KEY ("ownerCNH") REFERENCES "driver"("CNH") ON DELETE RESTRICT ON UPDATE CASCADE;
