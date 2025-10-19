"use server";

import { redirect } from "next/navigation";
import { deleteCartItem } from "../dal/cart";
import { getCurrentUser } from "../dal/user";
import { deleteCartItemSchema } from "../schema/cart";

export async function deleteCartItemAction(rawData: unknown) {
  const parsed = deleteCartItemSchema.safeParse(rawData);

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
    redirect("login");
  }

  try {
    await deleteCartItem({
      userId: user.id,
      productId: parsed.data.productId,
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
