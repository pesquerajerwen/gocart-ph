import { Store } from "@/generated/prisma/client";
import { prisma } from "../db/client";
import slugify from "slugify";

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
      slug: slugify(data.name),
    },
  });
}
