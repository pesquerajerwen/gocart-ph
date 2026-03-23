import { Store } from "@/generated/prisma/client";
import { prisma } from "../db/client";
import slugify from "slugify";
import { GetStoresParams, UpdateStoreStatusParams } from "../schema/store";

type GetStoreProps = {
  storeId?: string;
  userId?: string;
  slug?: string;
};

export async function getStore({ storeId, userId, slug }: GetStoreProps) {
  return prisma.store.findFirst({
    where: {
      ...(storeId && { id: storeId }),
      ...(userId && { userId }),
      ...(slug && { slug }),
    },
  });
}

export async function getStores({ page, size, status }: GetStoresParams) {
  const skip = (page - 1) * size;

  const where = {
    ...(status?.length && {
      status: {
        in: status,
      },
    }),
  };

  const [pendingStores, count] = await Promise.all([
    prisma.store.findMany({
      where,
      include: {
        user: true,
      },
      skip,
      take: size,
    }),
    prisma.store.count({
      where,
    }),
  ]);

  return {
    data: pendingStores,
    pagination: {
      page,
      size,
      totalCount: count,
      totalPage: Math.ceil(count / size),
    },
  };
}

export async function getStoreStatus({ storeId, slug }: GetStoreProps) {
  return prisma.store.findFirst({
    where: {
      ...(storeId && { id: storeId }),
      ...(slug && { slug }),
    },
    select: {
      status: true,
    },
  });
}

export async function createStore(
  data: Omit<Store, "id" | "status" | "createdAt" | "updatedAt">,
) {
  const store = await prisma.store.findFirst({
    where: {
      name: {
        equals: data.name,
        mode: "insensitive",
      },
    },
  });

  if (store)
    throw new Error(
      "A store with this name already exists. Please choose another name.",
    );

  return prisma.store.create({
    data: {
      ...data,
      status: "pending",
    },
  });
}

export async function updateStoreStatus({
  id,
  status,
}: UpdateStoreStatusParams) {
  return prisma.store.update({
    where: { id },
    data: { status },
    include: { user: true },
  });
}
