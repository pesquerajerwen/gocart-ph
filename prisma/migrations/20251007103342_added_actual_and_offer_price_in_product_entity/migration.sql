/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `actualPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "imageUrl",
DROP COLUMN "price",
ADD COLUMN     "actualPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "offerPrice" DECIMAL(65,30) NOT NULL;
