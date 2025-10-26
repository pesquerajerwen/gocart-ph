import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CartItemWithProduct } from "@/lib/types/cart";
import AddressSection from "./address-section";

type Props = {
  cartItems: CartItemWithProduct[];
};

export default async function PaymentSummary({ cartItems }: Props) {
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.offerPrice ?? item.product.actualPrice;
    return acc + price * item.quantity;
  }, 0);

  const shipping = subtotal > 500 ? 0 : 5; // TODO: Provide correct calculation

  const total = subtotal + shipping;

  return (
    <div className="p-6 rounded-md border space-y-5">
      <h2 className="text-slate-500 text-lg font-bold">Payment Summary</h2>

      <div className="space-y-2">
        <p className="text-slate-400 text-sm">Payment Method</p>
        <div>
          <RadioGroup defaultValue="cod">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="text-slate-500 text-sm">
                COD
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gcash" id="gcash" />
              <Label htmlFor="gcash" className="text-slate-500 text-sm">
                GCash
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Separator />

      <AddressSection />

      <Separator />

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

      <Button className="bg-slate-600 hover:bg-slate-900 w-full">
        Place Order
      </Button>
    </div>
  );
}
