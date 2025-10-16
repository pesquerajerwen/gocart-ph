import { Earth, CreditCard, User } from "lucide-react";

export default function SellingPoints() {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center text-slate-500 gap-3 text-sm">
        <Earth className="size-4" /> Free shipping worldwide
      </p>
      <p className="flex items-center text-slate-500 gap-3 text-sm">
        <CreditCard className="size-4" /> 100% Secured Payment
      </p>
      <p className="flex items-center text-slate-500 gap-3 text-sm">
        <User className="size-4" /> Trusted by top brands
      </p>
    </div>
  );
}
