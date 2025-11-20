import { prisma } from "../db/client";
import {
  CreateOrderParams,
  createOrderSchema,
  GetOrderCountParams,
  getOrderCountSchema,
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

  const { userId, sortKey, sortOrder, size, page } = data;

  const skip = (page - 1) * size;

  const where = {
    userId,
    status: { not: "pending" as const },
  };

  const [orders, count] = await Promise.all([
    prisma.order.findMany({
      where,
      select: {
        address: true,
        createdAt: true,
        items: {
          include: {
            review: true,
            product: {
              select: { productImages: true },
            },
          },
        },
      },
      orderBy: { [sortKey]: sortOrder },
      skip,
      take: size,
    }),
    prisma.order.count({ where }),
  ]);

  return {
    data: orders,
    pagination: {
      page,
      size,
      totalCount: count,
      totalPage: Math.ceil(count / size),
    },
  };
}

export async function getOrderCount(props: GetOrderCountParams) {
  const { data, error } = getOrderCountSchema.safeParse(props);

  if (error) throw new Error(error.message);

  const { userId } = data;

  return prisma.order.count({
    where: {
      userId,
      status: { not: "pending" },
    },
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

    if (!order) return;

    await tx.cartItem.deleteMany({
      where: {
        productId: {
          in: order.items.map((item) => item.productId),
        },
        userId: order.userId,
      },
    });

    const updates = order.items.map((item) =>
      tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      })
    );

    await Promise.all(updates);
  });
}
