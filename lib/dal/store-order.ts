import { serializePrisma } from "@/utils/prisma-serializer";
import { OrderItemStatus, Prisma } from "@prisma/client";
import { prisma } from "../db/client";
import {
  GetStoreOrderDetailsParams,
  getStoreOrderDetailsSchema,
  GetStoreOrdersParams,
  getStoreOrdersSchema,
  UpdateStoreOrderStatusParams,
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

  const {
    storeId,
    sortKey,
    sortOrder,
    size,
    page,
    search,
    status,
    payment,
    product,
    from,
    to,
  } = data;

  const skip = (page - 1) * size;

  const orderBy = buildOrderBy(sortKey, sortOrder);

  const where = buildOrderItemWhere({
    storeId,
    search,
    status,
    payment,
    product,
    from,
    to,
  });

  const [orderItems, count] = await Promise.all([
    prisma.orderItem.findMany({
      where,
      include: {
        order: {
          include: { payments: true, address: true },
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

function buildOrderItemWhere({
  storeId,
  search,
  status,
  payment,
  product,
  from,
  to,
}: {
  storeId: string;
  search?: string;
  status?: string;
  payment?: string;
  product?: string;
  from?: string;
  to?: string;
}): Prisma.OrderItemWhereInput {
  const and: Prisma.OrderItemWhereInput[] = [
    { order: { status: { not: "pending" as const } } },
  ];

  if (status) {
    and.push({ status: status as OrderItemStatus });
  }

  if (search) {
    and.push({
      order: {
        address: { fullName: { contains: search, mode: "insensitive" } },
      },
    });
  }

  if (payment) {
    and.push({
      order: { payments: { every: { paymentMethodType: payment } } },
    });
  }

  if (product) {
    and.push({ productName: { contains: product, mode: "insensitive" } });
  }

  if (from && to) {
    const fromDate = new Date(`${from}T00:00:00`);
    const toDate = new Date(`${to}T23:59:59.999`);

    and.push({
      order: {
        AND: [{ createdAt: { gte: fromDate } }, { createdAt: { lte: toDate } }],
      },
    });
  }

  return { product: { storeId }, AND: and };
}
