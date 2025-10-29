"use server";

import { getPayMongoAuthHeaderSingleKey } from "@/utils/paymongo";
import {
  CreateCheckoutSessionResponse,
  CreateCheckSessionSessionRequest,
} from "../types/paymongo";
import { PlaceOrderActionParams } from "../types/order";

const PAYMONGO_CHECKOUT_URL = "https://api.paymongo.com/v1/checkout_sessions";

export async function createCheckoutSession({
  items,
  paymentMethod,
}: Pick<PlaceOrderActionParams, "items" | "paymentMethod">) {
  const authHeader = await getPayMongoAuthHeaderSingleKey();

  const data: CreateCheckSessionSessionRequest = {
    attributes: {
      line_items: items.map((item) => ({
        currency: "PHP" as const,
        amount: item.product.offerPrice * 100,
        name: item.product.name,
        quantity: item.quantity,
        description: item.product.description ?? undefined,
        images: item.product.productImages.map((i) => i.url),
      })),
      payment_method_types: [paymentMethod],
      send_email_receipt: false,
      show_description: false,
      show_line_items: true,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders`,
    },
  };

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: authHeader,
    },
    body: JSON.stringify({ data }),
  };

  try {
    const res = await fetch(PAYMONGO_CHECKOUT_URL, options);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}. ${res.text}`);
    }

    const parsed: CreateCheckoutSessionResponse = await res.json();

    return { data: parsed.data };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while creating checkout session.",
    };
  }
}
