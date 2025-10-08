import { prisma } from "../db/client";

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}
