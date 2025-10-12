/*
  Warnings:

  - You are about to drop the column `total_rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `total_sales` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "total_rating",
DROP COLUMN "total_sales",
ADD COLUMN     "totalRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalSales" INTEGER NOT NULL DEFAULT 0;
