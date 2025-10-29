"use server";

import { Prisma } from "@prisma/client";
import { PlaceOrderActionParams } from "../types/order";
import { getCurrentUser } from "../dal/user";
import { redirectToLogin } from "@/utils/redirect";
import { createOrder } from "../dal/order";
import { createCheckoutSession } from "./paymongo";

export default async function placeOrderAction({
  items,
  paymentMethod,
  addressId,
}: PlaceOrderActionParams) {
  const user = await getCurrentUser();

  if (!user) {
    return redirectToLogin();
  }

  const totalAmount = items.reduce(
    (prev, current) => prev + current.product.offerPrice * current.quantity,
    0
  );

  await createOrder({
    order: {
      userId: user!.id,
      addressId,
      totalAmount: Prisma.Decimal(totalAmount),
    },
    items: items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productPrice: Prisma.Decimal(item.product.offerPrice),
      quantity: item.quantity,
      subtotal: Prisma.Decimal(item.product.offerPrice * item.quantity),
    })),
  });

  return await createCheckoutSession({ items, paymentMethod });
}
