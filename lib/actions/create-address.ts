"use server";

import { redirect } from "next/navigation";
import { createAddress } from "../dal/address";
import { getCurrentUser } from "../dal/user";
import { addressSchema } from "../schema/address";

export async function createAddressAction(rawData: unknown) {
  const parsed = addressSchema.safeParse(rawData);

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
    await createAddress({
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

  return { success: true, message: "Address successfully created." };
}
