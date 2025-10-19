"use client";

import { assets } from "@/assets/assets";
import CounterInput from "@/components/ui/counter-input";
import { CartItemWithProduct } from "@/lib/types/cart";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";

type Props = {
  cartItem: CartItemWithProduct;
};

export default function CartItem({ cartItem }: Props) {
  const { product } = cartItem;

  const primaryImage = product.productImages.find((p) => p.isPrimary);

  return (
    <div className="grid grid-cols-6 items-center">
      <div className="col-span-3">
        <div className="flex gap-2">
          <div
            className={cn(
              "bg-slate-100 p-2 rounded-sm flex justify-center items-center"
            )}
          >
            <div className={cn("relative size-12")}>
              <Image
                src={primaryImage?.url || assets.image_not_available}
                alt="Product Image"
                className="object-cover"
                sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 12rem"
                fill
              />
            </div>
          </div>
          <div>
            <p>{product.name}</p>
            <p className="text-xs text-slate-500">{product.categorySlug}</p>
            <p className="text-slate-600">${Number(product.offerPrice)}</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center">
        <CounterInput
          defaultValue={cartItem.quantity}
          min={0}
          onChange={(value) => null}
        />
      </div>
      <div className="col-span-1 flex justify-center">
        <p className="text-slate-600">
          ${cartItem.quantity * Number(product.offerPrice)}
        </p>
      </div>
      <div className="col-span-1 flex justify-center">
        <Trash2 className="text-red-500 size-5 cursor-pointer" />
      </div>
    </div>
  );
}
