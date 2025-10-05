/*
  Warnings:

  - Added the required column `status` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StoreStatus" AS ENUM ('pending', 'verified');

-- AlterTable
ALTER TABLE "public"."Store" ADD COLUMN     "status" "public"."StoreStatus" NOT NULL;
