import { prisma } from "../db/client";
import { UpsertAddressParams } from "../types/address";

export async function getPrimaryAddress({ userId }: { userId: string }) {
  return await prisma.address.findFirst({
    where: {
      userId,
      isDefault: true,
    },
  });
}

export async function getAddresses({ userId }: { userId: string }) {
  return await prisma.address.findMany({
    where: {
      userId,
    },
  });
}

export async function upsertAddress(data: UpsertAddressParams) {
  return await prisma.$transaction(async (tx) => {
    if (data.isDefault) {
      await tx.address.updateMany({
        where: {
          userId: data.userId,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const address = await tx.address.upsert({
      where: {
        id: data.id ?? "",
      },
      update: data,
      create: data,
    });

    return address;
  });
}
