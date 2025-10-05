/*
  Warnings:

  - Added the required column `email` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Store` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar_url` on table `Store` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Store` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "public"."StoreStatus" ADD VALUE 'deactivated';

-- AlterTable
ALTER TABLE "public"."Store" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "avatar_url" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "contact" SET NOT NULL;
