import { Decimal } from "@prisma/client/runtime/client";

export function serializePrisma<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      value instanceof Decimal ? value.toNumber() : value
    )
  );
}
