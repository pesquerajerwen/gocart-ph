import { getCartItems, getCartItemsCount } from "@/lib/dal/cart";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

type Props = {
  userId?: string;
};

export default async function Cart({ userId }: Props) {
  const cartItemsCount = userId ? await getCartItemsCount({ userId }) : [];

  return (
    <Link href={"/cart"}>
      <div className="flex items-center gap-3 relative cursor-pointer">
        <ShoppingCart size={18} />
        <Badge className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
          {cartItemsCount}
        </Badge>
        <p>Cart</p>
      </div>
    </Link>
  );
}
