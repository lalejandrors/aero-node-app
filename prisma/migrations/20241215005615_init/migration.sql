-- CreateTable
CREATE TABLE "Passenger" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR NOT NULL,
    "identification" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "birthday" DATE NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
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

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
