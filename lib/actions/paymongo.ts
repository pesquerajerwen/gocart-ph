"use server";

import { getPayMongoAuthHeaderSingleKey } from "@/utils/paymongo";
import {
  CreateCheckoutSessionParams,
  CreateCheckoutSessionResponse,
  CreateCheckSessionSessionRequest,
} from "../types/paymongo";

const PAYMONGO_CHECKOUT_URL = "https://api.paymongo.com/v1/checkout_sessions";

export async function createCheckoutSession({
  line_items,
  payment_method_types,
}: CreateCheckoutSessionParams) {
  const authHeader = await getPayMongoAuthHeaderSingleKey();

  const data: CreateCheckSessionSessionRequest = {
    attributes: {
      line_items,
      payment_method_types,
      send_email_receipt: false,
      show_description: false,
      show_line_items: true,
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
    console.error(err);

    return {
      error:
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while creating checkout session.",
    };
  }
}
