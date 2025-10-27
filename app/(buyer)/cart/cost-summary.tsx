import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CartItemWithProduct } from "@/lib/types/cart";
import { Fragment } from "react";

type Props = {
  cartItems: CartItemWithProduct[];
};

export default function CostSummary({ cartItems }: Props) {
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.offerPrice ?? item.product.actualPrice;
    return acc + price * item.quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 5; // TODO: Provide correct calculation

  const total = subtotal + shipping;

  return (
    <Fragment>
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-slate-400 text-sm">Subtotal:</p>
          <p className="text-slate-500 text-sm">P {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-slate-400 text-sm">Shipping:</p>
          <p className="text-slate-500 text-sm">P {shipping.toFixed(2)}</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Coupon Code" />
          <Button className="bg-slate-500 hover:bg-slate-800">Apply</Button>
        </div>
      </div>
      <Separator />

      <div className="flex justify-between">
        <p className="text-slate-400 text-sm font-semibold">Total:</p>
        <p className="text-slate-500 text-sm font-semibold">
          P {total.toFixed(2)}
        </p>
      </div>
    </Fragment>
  );
}
