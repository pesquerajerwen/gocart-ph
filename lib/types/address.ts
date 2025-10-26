import { Address } from "@prisma/client";

export type UpsertAddressParams = Omit<
  Address,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};
