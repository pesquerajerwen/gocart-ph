"use client";

import { assets } from "@/assets/assets";
import CounterInput from "@/components/ui/counter-input";
import { cn } from "@/lib/utils";
import { Trash2, TrashIcon } from "lucide-react";
import Image from "next/image";

export default function CartItem() {
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
                src={assets.product_img1}
                alt="Product Image"
                className="object-contain"
                sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 12rem"
                fill
              />
            </div>
          </div>
          <div>
            <p>Apple Wireless</p>
            <p className="text-xs text-slate-500">Electronics</p>
            <p className="text-slate-600">$89</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center">
        <CounterInput defaultValue={1} min={0} onChange={(value) => null} />
      </div>
      <div className="col-span-1 flex justify-center">
        <p className="text-slate-600">$89</p>
      </div>
      <div className="col-span-1 flex justify-center">
        <Trash2 className="text-red-500 size-5" />
      </div>
    </div>
  );
}
