import { prisma } from "../db/client";
import { CreateAddressParams } from "../types/address";

export async function createAddress(data: CreateAddressParams) {
  return await prisma.address.create({ data });
}
