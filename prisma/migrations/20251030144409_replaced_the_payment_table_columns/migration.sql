/*
  Warnings:

  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `checkoutSessionId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodType` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `paidAt` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "status",
DROP COLUMN "stripePaymentId",
ADD COLUMN     "checkoutSessionId" TEXT NOT NULL,
ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "paymentMethodType" TEXT NOT NULL,
ALTER COLUMN "paidAt" SET NOT NULL;

-- DropEnum
DROP TYPE "public"."PaymentStatus";
