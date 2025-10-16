"use server";

import { createCartItem } from "../dal/cart";
import { getUserBySupabaseId } from "../dal/user";
import { createCartSchema } from "../schema/cart";

export async function createCartItemAction(rawData: unknown) {
  const parsed = createCartSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.message,
      },
    };
  }

  const user = await getUserBySupabaseId(parsed.data.userId);

  if (!user) {
    return {
      success: false,
      error: {
        message: "User not found",
      },
    };
  }

  try {
    await createCartItem({
      ...parsed.data,
      userId: user.id,
    });
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, message: "Cart successfully created." };
}
