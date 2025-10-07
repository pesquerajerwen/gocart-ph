"use server";

import { createProduct } from "../dal/product";
import { createProductSchema } from "../schema/product";

export async function createProductAction(rawData: unknown) {
  const parsed = createProductSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.message,
      },
    };
  }

  let productId = null;

  try {
    // const { id } = await createProduct({
    //   ...parsed.data,
    // });

    productId = "id";
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
