"use server";

import { redirect } from "next/navigation";
import { updateCartItemQuantity } from "../dal/cart";
import { getCurrentUser } from "../dal/user";
import { updateCartItemQuantitySchema } from "../schema/cart";

export async function updateCartItemQuantityAction(rawData: unknown) {
  const parsed = updateCartItemQuantitySchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.message,
      },
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return redirect("login");
  }

  try {
    await updateCartItemQuantity({
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

  return { success: true, message: "Cart item quantity successfully updated." };
}
