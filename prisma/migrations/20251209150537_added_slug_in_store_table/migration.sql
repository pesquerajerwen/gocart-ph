/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Store_slug_key" ON "Store"("slug");
