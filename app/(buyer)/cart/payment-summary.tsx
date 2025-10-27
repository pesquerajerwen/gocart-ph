"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createCheckoutSession } from "@/lib/actions/paymongo";
import { CartItemWithProduct } from "@/lib/types/cart";
import { useCartStore } from "@/zustand/cart-store";
import { toast } from "sonner";
import AddressSection from "./address-section";
import CostSummary from "./cost-summary";
import PaymentMethods from "./payment-methods";

type Props = {
  cartItems: CartItemWithProduct[];
};

export default function PaymentSummary({ cartItems }: Props) {
  const selectedPaymentMethod = useCartStore.use.selectedPaymentMethod();

  async function handlePlaceOrder() {
    const lineItems = cartItems.map((cartItem) => ({
      amount: cartItem.product.offerPrice * cartItem.quantity * 100,
      currency: "PHP" as const,
      name: cartItem.product.name,
      quantity: cartItem.quantity,
      images: cartItem.product.productImages.map((image) => image.url),
    }));

    const { error, data } = await createCheckoutSession({
      line_items: lineItems,
      payment_method_types: [selectedPaymentMethod!],
    });

    if (error) {
      return toast.error(error);
    }

    if (data?.attributes) {
      window.open(data?.attributes.checkout_url, "_blank");
    }
  }

  return (
    <div className="p-6 rounded-md border space-y-5">
      <h2 className="text-slate-500 text-lg font-bold">Payment Summary</h2>

      <PaymentMethods />

      <Separator />

      <AddressSection />

      <Separator />

      <CostSummary cartItems={cartItems} />

      <Button
        className="bg-slate-600 hover:bg-slate-900 w-full"
        onClick={() => handlePlaceOrder()}
      >
        Place Order
      </Button>
    </div>
  );
}
