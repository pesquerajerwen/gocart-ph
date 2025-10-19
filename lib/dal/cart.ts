import { prisma } from "../db/client";
import { CreateCartParams } from "../types/cart";

export async function getCartItems({ userId }: { userId: string }) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        include: { productImages: true },
      },
    },
  });

  return cartItems.map((cartItem) => ({
    ...cartItem,
    product: {
      ...cartItem.product,
      offerPrice: Number(cartItem.product.offerPrice),
      actualPrice: Number(cartItem.product.actualPrice),
    },
  }));
}

export async function getCartItemsCount({ userId }: { userId: string }) {
  return prisma.cartItem.count({ where: { userId } });
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
