-- CreateEnum
CREATE TYPE "public"."TruckStatus" AS ENUM ('AVAILABLE', 'IN_MAINTENANCE');

-- CreateTable
CREATE TABLE "public"."Truck" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "public"."TruckStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "truckId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Truck_plate_key" ON "public"."Truck"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "public"."Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_truckId_key" ON "public"."Driver"("truckId");

-- AddForeignKey
ALTER TABLE "public"."Driver" ADD CONSTRAINT "Driver_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "public"."Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
