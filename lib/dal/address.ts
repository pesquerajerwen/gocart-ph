import { prisma } from "../db/client";
import { CreateAddressParams } from "../types/address";

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

export async function createAddress(data: CreateAddressParams) {
  return await prisma.address.create({ data });
}
