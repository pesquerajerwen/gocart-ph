import { serializePrisma } from "@/utils/prisma-serializer";
import { prisma } from "../db/client";
import {
  GetStoreOrderDetailsParams,
  getStoreOrderDetailsSchema,
  GetStoreOrdersParams,
  getStoreOrdersSchema,
  UpdateStoreOrderStatusParams,
  updateStoreOrderStatusSchema,
} from "../schema/order";

export async function getStoreOrderDetails(props: GetStoreOrderDetailsParams) {
  const { data, error } = getStoreOrderDetailsSchema.safeParse(props);

  if (error) throw new Error(error.message);

  const { orderItemId } = data;

  const orderItems = await prisma.orderItem.findFirst({
    where: {
      id: orderItemId,
    },
    include: {
      order: {
        include: { user: true, payments: true, address: true },
      },
      product: {
        select: {
          productImages: true,
          store: true,
        },
      },
    },
  });

  return serializePrisma(orderItems);
}

export async function getStoreOrders(props: GetStoreOrdersParams) {
  const { data, error } = getStoreOrdersSchema.safeParse(props);

  if (error) throw new Error(error.message);

  const { storeId, sortKey, sortOrder, size, page } = data;

  const skip = (page - 1) * size;

  const orderBy = buildOrderBy(sortKey, sortOrder);

  const where = {
    order: { status: { not: "pending" as const } },
    product: { storeId },
  };

  const [orderItems, count] = await Promise.all([
    prisma.orderItem.findMany({
      where,
      include: {
        order: {
          include: { user: true, payments: true },
        },
      },
      ...(orderBy ? { orderBy } : {}),
      skip,
      take: size,
    }),
    prisma.orderItem.count({ where }),
  ]);

  const serializedOrderItems = serializePrisma(orderItems);

  return {
    data: serializedOrderItems,
    pagination: {
      page,
      size,
      totalCount: count,
      totalPage: Math.ceil(count / size),
    },
  };
}

export async function updateStoreOrderStatus({
  id,
  status,
}: UpdateStoreOrderStatusParams) {
  return prisma.orderItem.update({
    where: { id },
    data: { status },
  });
}

function buildOrderBy(sortKey: string, sortOrder: "asc" | "desc") {
  switch (sortKey) {
    case "order.id":
      return { order: { id: sortOrder } };
    case "order.createdAt":
      return { order: { createdAt: sortOrder } };

    case "total":
      return { total: sortOrder };
    case "status":
      return { status: sortOrder };

    default:
      return { order: { createdAt: sortOrder } };
  }
}
