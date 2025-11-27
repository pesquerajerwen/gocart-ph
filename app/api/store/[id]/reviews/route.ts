import { getStoreReviews } from "@/lib/dal/reviews";
import { getStoreReviewsSchema } from "@/lib/schema/product-review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { data, error } = getStoreReviewsSchema.safeParse({
      ...request,
      storeId: id,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const storeReviews = await getStoreReviews(data);

    return NextResponse.json(storeReviews);
  } catch (error) {
    console.error("[GET_STORE_REVIEWS]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
