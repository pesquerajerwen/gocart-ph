"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createCartItem } from "../dal/cart";
import { getCurrentUser } from "../dal/user";
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

  const user = await getCurrentUser();

  if (!user) {
    const headersList = await headers();
    const fullUrl = headersList.get("x-url") ?? "";

    const pathname = fullUrl ? new URL(fullUrl).pathname : "/";

    redirect("/login?next=" + encodeURIComponent(pathname));
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
