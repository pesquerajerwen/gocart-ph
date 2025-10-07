/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatarUrl` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Store" DROP CONSTRAINT "Store_user_id_fkey";

-- DropIndex
DROP INDEX "public"."Store_user_id_key";

-- AlterTable
ALTER TABLE "public"."Store" DROP COLUMN "avatar_url",
DROP COLUMN "user_id",
ADD COLUMN     "avatarUrl" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_userId_key" ON "public"."Store"("userId");

-- AddForeignKey
ALTER TABLE "public"."Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
