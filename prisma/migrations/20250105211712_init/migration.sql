/*
  Warnings:

  - You are about to drop the column `password` on the `passenger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "passenger" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR NOT NULL,
    "identification" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
