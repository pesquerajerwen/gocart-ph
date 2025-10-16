import { prisma } from "../db/client";
import { CreateCartParams } from "../types/cart";

export async function getCartItems({ userId }: { userId: string }) {
  return prisma.cartItem.findMany({ where: { userId } });
}

export async function createCartItem(data: CreateCartParams) {
  return prisma.cartItem.upsert({
    where: {
      userId_productId: { userId: data.userId, productId: data.productId },
    },
    create: data,
    update: {
      quantity: { increment: data.quantity },
    },
  });
}
