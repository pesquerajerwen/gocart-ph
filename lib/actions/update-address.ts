"use server";

import { redirectToLogin } from "@/utils/redirect";
import { upsertAddress } from "../dal/address";
import { getCurrentUser } from "../dal/user";
import { updateAddressSchema } from "../schema/address";

export async function updateAddressAction(rawData: unknown) {
  const parsed = updateAddressSchema.safeParse(rawData);

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
    return redirectToLogin();
  }

  try {
    await upsertAddress({
      ...parsed.data,
      userId: user!.id,
    });
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, message: "Address successfully updated." };
}
