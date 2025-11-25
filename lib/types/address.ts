import { Address } from "@/generated/prisma/client";

export type UpsertAddressParams = Omit<
  Address,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};
