export type LineItem = {
  amount: number;
  currency: "PHP";
  description?: string;
  images?: string[];
  name: string;
  quantity: number;
};

export type PaymentMethodType =
  | "shopee_pay"
  | "qrph"
  | "billease"
  | "card"
  | "dob"
  | "dob_ubp"
  | "brankas_bdo"
  | "brankas_landbank"
  | "brankas_metrobank"
  | "gcash"
  | "grab_pay"
  | "paymaya";

export type CreateCheckSessionSessionRequest = {
  attributes: {
    success_url?: string;
    cancel_url?: string;
    description?: string;
    line_items: LineItem[];
    payment_method_types: PaymentMethodType[];
    send_email_receipt?: boolean;
    show_description?: boolean;
    show_line_items?: boolean;
  };
};

export type CreateCheckoutSessionResponse = {
  data: {
    id: string;
    attributes: {
      checkout_url: string; // redirect the customer here
      client_key: string; // identify this checkout session
      description: string | null;
      line_items: {
        name: string;
        amount: number;
        currency: string;
        quantity: number;
      }[];
      status: string; // e.g. "active", "completed"
      payment_intent: {
        id: string;
        attributes: {
          status: string; // e.g. "awaiting_payment_method", "succeeded"
        };
      };
    };
  };
};

export type CreateCheckoutSessionParams = Pick<
  CreateCheckSessionSessionRequest["attributes"],
  "line_items" | "payment_method_types"
>;
