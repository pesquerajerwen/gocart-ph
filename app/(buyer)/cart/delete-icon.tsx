"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteCartItemAction } from "@/lib/actions/delete-cart-item";
import { useCartStore } from "@/lib/zustand/cart-store";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  productId: string;
};

export default function DeleteIcon({ productId }: Props) {
  const router = useRouter();

  const { cartItems, setCartItems } = useCartStore();

  async function handleClick() {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );

    setCartItems(updatedCartItems);

    const { error } = await deleteCartItemAction({
      productId,
    });

    if (error) {
      return toast.error(error.message);
    }

    router.refresh();
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Trash2
          className="text-slate-500 hover:text-red-500 size-5 cursor-pointer"
          onClick={handleClick}
        />
      </TooltipTrigger>
      <TooltipContent sideOffset={5}>
        <p className="text-sm">Remove item</p>
      </TooltipContent>
    </Tooltip>
  );
}
