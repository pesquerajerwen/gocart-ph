import { Prisma, PrismaClient } from "@/generated/prisma/client";

export type DBClient = PrismaClient | Prisma.TransactionClient;
