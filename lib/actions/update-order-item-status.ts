"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../dal/user";
import { updateStoreOrderStatusSchema } from "../schema/order";
import { updateStoreOrderStatus } from "../dal/store-order";

export async function updateOrderItemStatusAction(rawData: unknown) {
  const parsed = updateStoreOrderStatusSchema.safeParse(rawData);

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
    await updateStoreOrderStatus(parsed.data);
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, message: "Status successfully updated." };
}
