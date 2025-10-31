import { assets } from "@/assets/assets";
import { cn } from "@/utils/tailwind";
import Image from "next/image";
import OrderStatus from "./order-status";
import { OrderItemWithProductImages } from "@/lib/types/order";
import dayjs from "dayjs";
import { Address } from "@prisma/client";

type Props = {
  dateOrdered: Date;
  address: Address;
  orderItem: OrderItemWithProductImages;
};

export default function OrderItem({ orderItem, dateOrdered, address }: Props) {
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
                src={
                  orderItem.product.productImages[0].url ||
                  assets.image_not_available
                }
                alt="Product Image"
                className="object-cover"
                sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 12rem"
                fill
              />
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <p>{orderItem.productName}</p>
              <p className="text-sm text-slate-500">
                P{orderItem.productPrice.toFixed(2)} Qty: {orderItem.quantity}
              </p>
              <p className="text-sm text-slate-500">
                {dayjs(dateOrdered).format("ddd MMM DD YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center max-sm:hidden">
        <p className="text-sm text-slate-500">
          P{(Number(orderItem.productPrice) * orderItem.quantity).toFixed(2)}
        </p>
      </div>
      <div className="col-span-2 flex justify-center">
        <p className="text-sm text-slate-500 ">
          {`${address.address}, ${address.barangay}, ${address.city}, ${address.province}, ${address.region}, ${address.zipcode}`}
        </p>
      </div>
      <div className="col-span-1 flex justify-center">
        <OrderStatus variant={orderItem.status} />
      </div>
    </div>
  );
}
