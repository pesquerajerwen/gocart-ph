import { getStoreOrders } from "@/lib/dal/store-order";
import { getStoreProducts } from "@/lib/dal/store-products";
import { getStoreOrdersSchema } from "@/lib/schema/order";
import { getStoreProductsSchema } from "@/lib/schema/store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const payment = searchParams.get("payment");
    const status = searchParams.get("status");
    const product = searchParams.get("product");

    const page = searchParams.get("page");
    const size = searchParams.get("size");
    const sortKey = searchParams.get("sortKey");
    const sortOrder = searchParams.get("sortOrder");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const { data, error } = getStoreOrdersSchema.safeParse({
      storeId: id,
      search,
      payment,
      status,
      product,
      page,
      size,
      sortKey,
      sortOrder,
      from,
      to,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const storeOrders = await getStoreOrders(data);

    return NextResponse.json(storeOrders);
  } catch (error) {
    console.error("[GET_STORE_ORDERS]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
