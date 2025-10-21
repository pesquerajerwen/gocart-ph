/*
  Warnings:

  - You are about to drop the column `postalCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - Added the required column `barangay` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Address" DROP COLUMN "postalCode",
DROP COLUMN "state",
ADD COLUMN     "barangay" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
