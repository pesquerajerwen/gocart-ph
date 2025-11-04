import { getCurrentUser } from "@/lib/dal/current-user";
import { getOrders } from "@/lib/dal/order";
import { getOrdersSchema } from "@/lib/schema/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page");
    const size = searchParams.get("size");
    const sortKey = searchParams.get("sortKey");
    const sortOrder = searchParams.get("sortOrder");

    const { data, error } = getOrdersSchema.safeParse({
      page,
      size,
      sortKey,
      sortOrder,
      userId: currentUser.id,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const orders = await getOrders(data);

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[GET_ORDERS]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
