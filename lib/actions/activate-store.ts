"use server";

import { updateStoreStatus } from "../dal/store";
import { updateStoreStatusSchema } from "../schema/store";

export async function activateStoreAction(rawData: unknown) {
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
    await updateStoreStatus({ id: parsed.data.id, status: "verified" });
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
