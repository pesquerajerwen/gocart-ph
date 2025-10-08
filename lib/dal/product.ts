import { Product } from "@prisma/client";
import { prisma } from "../db/client";

export async function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
) {
  return prisma.product.create({
    data: data,
  });
}
