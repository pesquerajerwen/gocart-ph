"use server";

import { updateStoreStatus } from "../dal/store";
import { deactivateStoreProducts } from "../dal/store-products";
import { prisma } from "../db/client";
import { updateStoreStatusSchema } from "../schema/store";

export async function deactivateStoreAction(rawData: unknown) {
  const parsed = updateStoreStatusSchema.pick({ id: true }).safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.message,
      },
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await updateStoreStatus(
        { id: parsed.data.id, status: "deactivated" },
        tx,
      );

      await deactivateStoreProducts({ storeId: parsed.data.id }, tx);
    });
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, message: "Store has been activated." };
}
