"use server";

import { Decimal } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../dal/current-user";
import { createProduct } from "../dal/product";
import { getStore } from "../dal/store";
import { createProductServerSchema } from "../schema/product";

export async function createProductAction(rawData: unknown) {
  const parsed = createProductServerSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.message,
      },
    };
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/forbidden");
  }

  const store = await getStore({ userId: currentUser.id });

  if (!store) {
    return {
      success: false,
      error: {
        message: "There is no store connected to the current user",
      },
    };
  }

  let productId = null;

  try {
    const { id } = await createProduct({
      ...parsed.data,
      actualPrice: new Decimal(parsed.data.actualPrice),
      offerPrice: new Decimal(parsed.data.offerPrice),
      storeId: store.id,
    });

    productId = id;
  } catch (error) {
    return {
      success: false,
      error: {
        message: (error as Error).message,
      },
    };
  }

  return { success: true, productId, message: "Product successfully created." };
}
