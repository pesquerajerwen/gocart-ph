import { getProductReviews } from "@/lib/dal/reviews";
import { getProductReviewsSchema } from "@/lib/schema/product-review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page");
    const size = searchParams.get("size");

    const { data, error } = getProductReviewsSchema.safeParse({
      productId: id,
      page,
      size,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const orders = await getProductReviews(data);

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[GET_ORDERS]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
