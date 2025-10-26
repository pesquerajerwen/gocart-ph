import { assets } from "@/assets/assets";
import { cn } from "@/utils/tailwind";
import Image from "next/image";
import OrderStatus from "./order-status";

export default function OrderItem() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4">
      <div className="col-span-2">
        <div className="flex gap-2">
          <div
            className={cn(
              "bg-slate-100 p-2 rounded-sm flex justify-center items-center"
            )}
          >
            <div className={cn("relative size-16")}>
              <Image
                src={assets.product_img3}
                alt="Product Image"
                className="object-cover"
                sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 12rem"
                fill
              />
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <p>Apple Wireless Earbuds</p>
              <p className="text-sm text-slate-500">P89.00 Qty: 4</p>
              <p className="text-sm text-slate-500">Sun Oct 26 2025</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center max-sm:hidden">
        <p className="text-sm text-slate-500">P89.00</p>
      </div>
      <div className="col-span-2 flex justify-center">
        <p className="text-sm text-slate-500 ">
          John Paul, 041 bulubundukin, bondoc, canto, 3025, Philippines
        </p>
      </div>
      <div className="col-span-1 flex justify-center">
        <OrderStatus variant={"shipped"} />
      </div>
    </div>
  );
}
