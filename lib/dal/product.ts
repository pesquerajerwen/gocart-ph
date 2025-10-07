import { Product } from "@prisma/client";
import { prisma } from "../db/client";

export async function createProduct(data: Product) {
  return prisma.product.create({
    data: data,
  });
}
