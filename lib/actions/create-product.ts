"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../dal/current-user";
import { createProduct } from "../dal/product";
import { getStore } from "../dal/store";
import { createProductServerSchema } from "../schema/product";
import { ProductStatus } from "@prisma/client";
import slugify from "slugify";

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

  const { productImages, categoryName, ...rest } = parsed.data;

  const mappedProductImages = productImages
    .filter((i) => i?.url)
    .map((i) => ({
      isPrimary: i?.isPrimary || false,
      url: i?.url || "",
    }));

  try {
    const { id } = await createProduct({
      ...rest,
      productImages: mappedProductImages,
      status: ProductStatus.active,
      storeId: store.id,
      categorySlug: slugify(categoryName, { lower: true }),
      totalRating: 0,
      totalSales: 0,
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
