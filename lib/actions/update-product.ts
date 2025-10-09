"use server";

import { updateProductStatus } from "../dal/product";
import { updateProductStatusSchema } from "../schema/product";

export async function updateProductStatusAction(rawData: unknown) {
  const parsed = updateProductStatusSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.message,
      },
    };
  }

  try {
    await updateProductStatus(parsed.data);
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, message: "Product status successfully updated." };
}
