-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('active', 'deactivated');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "status" "public"."ProductStatus" NOT NULL DEFAULT 'active';
