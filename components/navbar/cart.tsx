import { getCartItems } from "@/lib/dal/cart";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

type Props = {
  userId?: string;
};

export default async function Cart({ userId }: Props) {
  const cartItems = userId ? await getCartItems({ userId }) : [];

  return (
    <Link href={"/cart"}>
      <div className="flex items-center gap-3 relative cursor-pointer">
        <ShoppingCart size={18} />
        <Badge className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
          {cartItems.length}
        </Badge>
        <p>Cart</p>
      </div>
    </Link>
  );
}
