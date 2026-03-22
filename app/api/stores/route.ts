import { getStores } from "@/lib/dal/store";
import { getStoresSchema } from "@/lib/schema/store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const status = searchParams.get("status");
    const page = searchParams.get("page");
    const size = searchParams.get("size");

    const { data, error } = getStoresSchema.safeParse({
      page,
      size,
      status: status?.split(","),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const pendingStores = await getStores(data);

    return NextResponse.json(pendingStores);
  } catch (error) {
    console.error("[GET_PENDING_STORES]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
