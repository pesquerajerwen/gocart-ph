/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Store" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_user_id_key" ON "public"."Store"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Store" ADD CONSTRAINT "Store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
