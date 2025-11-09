import { getStoreProducts } from "@/lib/dal/store-products";
import { getStoreProductsSchema } from "@/lib/schema/store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { data, error } = getStoreProductsSchema.safeParse({ storeId: id });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const storeProducts = await getStoreProducts(data);

    return NextResponse.json(storeProducts);
  } catch (error) {
    console.error("[GET_STORE_PRODUCTS]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
