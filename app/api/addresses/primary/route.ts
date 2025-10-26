import { getPrimaryAddress } from "@/lib/dal/address";
import { getCurrentUser } from "@/lib/dal/current-user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const address = await getPrimaryAddress({ userId: currentUser.id });

    return NextResponse.json(address);
  } catch (error) {
    console.error("[GET_PRIMARY_ADDRESS]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
