import { Address } from "@prisma/client";

export type CreateAddressParams = Omit<
  Address,
  "id" | "createdAt" | "updatedAt"
>;
