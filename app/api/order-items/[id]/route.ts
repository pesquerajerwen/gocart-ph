import { getCurrentUser } from "@/lib/dal/current-user";
import { getStoreOrderDetails } from "@/lib/dal/store-order";
import { getStoreOrderDetailsSchema } from "@/lib/schema/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const { data, error } = getStoreOrderDetailsSchema.safeParse({
      orderItemId: id,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const orderDetails = await getStoreOrderDetails(data);

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error("[GET_ORDER_DETAILS]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
