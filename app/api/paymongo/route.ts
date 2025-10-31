import { finalizeOrderPayment } from "@/lib/dal/order";
import { verifyPaymongoSignature } from "@/utils/paymongo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const signatureHeader = request.headers.get("Paymongo-Signature");
  if (!signatureHeader) {
    return NextResponse.json(
      { error: "Missing signature header" },
      { status: 400 }
    );
  }

  const body = await request.text();
  const secret = process.env.PAYMONGO_WEBHOOK_SECRET_KEY!;
  const mode: "test" | "live" =
    process.env.PAYMONGO_MODE === "live" ? "live" : "test";

  const valid = verifyPaymongoSignature(body, signatureHeader, secret, mode);

  if (!valid) {
    console.error("Invalid PayMongo signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.data.attributes.type === "checkout_session.payment.paid") {
    const checkoutSession = event.data.attributes.data;
    const checkoutAttr = checkoutSession.attributes;
    const payment = checkoutAttr.payments?.[0];
    const paymentAttr = payment?.attributes;

    await finalizeOrderPayment({
      orderId: checkoutAttr.reference_number,
      sessionId: checkoutSession.id,
      paymentId: payment.id,
      amount: paymentAttr.amount,
      paymentMethodType: paymentAttr.source.type,
      paidAt: new Date(paymentAttr.paid_at * 1000),
    });
  }

  return NextResponse.json({ received: true });
}
