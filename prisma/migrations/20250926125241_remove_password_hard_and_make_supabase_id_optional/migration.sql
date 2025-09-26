/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "passwordHash",
ALTER COLUMN "supabaseId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "public"."Role"("name");
