import { prisma } from "../db/client";
import {
  CreateOrderParams,
  createOrderSchema,
  GetOrderParams,
  getOrdersSchema,
} from "../schema/order";
import { FinalizeOrderPaymentParams } from "../types/order";

export async function createOrder(props: CreateOrderParams) {
  const { data, error } = createOrderSchema.safeParse(props);

  if (error) throw new Error(error.message);

  return prisma.order.create({
    data: {
      ...data.order,
      items: {
        create: data.items,
      },
    },
  });
}

export async function getOrders(props: GetOrderParams) {
  const { data, error } = getOrdersSchema.safeParse(props);

  if (error) throw new Error(error.message);

  const { userId, sortKey, sortOrder } = data;

  return prisma.order.findMany({
    where: {
      userId,
      status: { not: "pending" },
    },
    select: {
      address: true,
      createdAt: true,
      items: {
        include: {
          product: {
            select: { productImages: true },
          },
        },
      },
    },
    orderBy: { [sortKey]: sortOrder },
  });
}

export async function finalizeOrderPayment({
  orderId,
  sessionId,
  paymentId,
  amount,
  paymentMethodType,
  paidAt,
}: FinalizeOrderPaymentParams) {
  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        payments: {
          create: {
            checkoutSessionId: sessionId,
            paymentId,
            amount,
            paymentMethodType,
            paidAt,
          },
        },
        items: {
          updateMany: {
            where: {},
            data: {
              status: "processing",
            },
          },
        },
      },
    });

    const order = await tx.order.findFirst({
      where: { id: orderId },
      select: {
        userId: true,
        items: true,
      },
    });

    if (order) {
      await tx.cartItem.deleteMany({
        where: {
          productId: {
            in: order.items.map((item) => item.productId),
          },
          userId: order.userId,
        },
      });
    }
  });
}
