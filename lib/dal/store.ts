import { Store } from "@/generated/prisma/client";
import { prisma } from "../db/client";

type GetStoreProps = {
  storeId?: string;
  userId?: string;
};

export async function getStore({ storeId, userId }: GetStoreProps) {
  if (storeId) {
    return prisma.store.findFirst({
      where: {
        id: storeId,
      },
    });
  }

  if (userId) {
    return prisma.store.findFirst({
      where: {
        userId: userId,
      },
    });
  }
}

export async function createStore(
  data: Omit<Store, "id" | "status" | "createdAt" | "updatedAt">
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
      "A store with this name already exists. Please choose another name."
    );

  return prisma.store.create({
    data: {
      ...data,
      status: "pending",
    },
  });
}
