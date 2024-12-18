/*
  Warnings:

  - You are about to drop the `Flight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Passenger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_passenger_id_fkey";

-- DropTable
DROP TABLE "Flight";

-- DropTable
DROP TABLE "Passenger";

-- CreateTable
CREATE TABLE "passenger" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR NOT NULL,
    "identification" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "birthday" DATE NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flight" (
    "id" SERIAL NOT NULL,
    "passenger_id" INTEGER NOT NULL,
    "number" VARCHAR NOT NULL,
    "airline" VARCHAR NOT NULL,
    "departure_datetime" TIMESTAMP NOT NULL,
    "departure_city" VARCHAR NOT NULL,
    "arrival_city" VARCHAR NOT NULL,
    "seat" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "flight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flight" ADD CONSTRAINT "flight_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
