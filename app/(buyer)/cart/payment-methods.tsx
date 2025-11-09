import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentMethodType } from "@/lib/types/paymongo";
import { useCartStore } from "@/lib/zustand/cart-store";

const PAYMENT_METHODS = [
  {
    value: "gcash",
    label: "GCash",
  },
  {
    value: "paymaya",
    label: "Maya",
  },
  {
    value: "qrph",
    label: "QR PH",
  },
];

export default function PaymentMethods() {
  const selectedPaymentMethod = useCartStore.use.selectedPaymentMethod();
  const selectPaymentMethod = useCartStore.use.selectPaymentMethod();

  return (
    <div className="space-y-2">
      <p className="text-slate-400 text-sm">Payment Method</p>
      <div>
        <RadioGroup
          defaultValue={selectedPaymentMethod ?? undefined}
          onValueChange={(value) =>
            selectPaymentMethod(value as PaymentMethodType)
          }
        >
          {PAYMENT_METHODS.map((p) => (
            <div key={p.value} className="flex items-center space-x-2">
              <RadioGroupItem value={p.value} id={p.value} />
              <Label htmlFor={p.value} className="text-slate-500 text-sm">
                {p.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
