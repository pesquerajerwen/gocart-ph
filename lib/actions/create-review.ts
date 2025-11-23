"use server";

import { redirectToLogin } from "@/utils/redirect";
import { createProductReview } from "../dal/reviews";
import { getCurrentUser } from "../dal/user";
import { createProductReviewServerSchema } from "../schema/product-review";

export async function createProductReviewAction(rawData: unknown) {
  const user = await getCurrentUser();

  if (!user) {
    return redirectToLogin();
  }

  const parsed = createProductReviewServerSchema.safeParse({
    ...Object(rawData),
    userId: user.id,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: {
        message: parsed.error.message,
      },
    };
  }

  const { images, ...rest } = parsed.data;

  try {
    await createProductReview({
      ...rest,
      images,
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

  return { success: true, message: "Product review successfully created." };
}
