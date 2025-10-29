import { prisma } from "../db/client";
import { CreateOrderParams } from "../types/order";

export async function createOrder(data: CreateOrderParams) {
  return prisma.order.create({
    data: {
      ...data.order,
      items: {
        create: data.items,
      },
    },
  });
}
