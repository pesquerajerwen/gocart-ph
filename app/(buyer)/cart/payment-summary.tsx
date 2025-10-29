"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import placeOrderAction from "@/lib/actions/order";
import { CartItemWithProduct } from "@/lib/types/cart";
import { useCartStore } from "@/zustand/cart-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import AddressSection from "./address-section";
import CostSummary from "./cost-summary";
import PaymentMethods from "./payment-methods";

type Props = {
  cartItems: CartItemWithProduct[];
};

export default function PaymentSummary({ cartItems }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const selectedPaymentMethod = useCartStore.use.selectedPaymentMethod();
  const selectedAddress = useCartStore.use.selectedAddress();

  function handlePlaceOrder() {
    startTransition(async () => {
      const response = await placeOrderAction({
        items: cartItems,
        paymentMethod: selectedPaymentMethod!,
        addressId: selectedAddress!.id,
      });

      if (!response) return;

      const { error, data } = response;

      if (error) {
        toast.error(error);

        return;
      }

      if (data?.attributes) {
        router.push(data?.attributes.checkout_url);

        return;
      }
    });
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
        disabled={isPending}
      >
        Place Order
      </Button>
    </div>
  );
}
