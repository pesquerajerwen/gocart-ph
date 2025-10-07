"use server";

import { createStore } from "../dal/store";
import { getUserBySupabaseId } from "../dal/user";
import { createStoreServerSchema } from "../schema/store";

export async function createStoreAction(rawData: unknown) {
  const parsed = createStoreServerSchema.safeParse(rawData);

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

  let storeId = null;

  try {
    const { id } = await createStore({
      ...parsed.data,
      userId: user.id,
    });

    storeId = id;
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, storeId, message: "Store successfully created." };
}
