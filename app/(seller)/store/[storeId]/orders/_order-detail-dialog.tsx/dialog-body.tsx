import { assets } from "@/assets/assets";
import { StoreOrderDetail } from "@/lib/types/order";
import Image from "next/image";
import dayjs from "dayjs";
import { Fragment } from "react";
import OrderStatus from "@/components/order-status";

type Props = {
  storeOrderDetail: StoreOrderDetail;
};

export default function DialogBody({ storeOrderDetail }: Props) {
  const { address, barangay, city, province, region, zipcode } =
    storeOrderDetail.order.address;

  return (
    <Fragment>
      <p className="mt-3 text-slate-800 text-sm font-semibold">
        Customer Details
      </p>

      <section className="space-y-1">
        <p className="grid grid-cols-5 gap-3">
          <span className="text-sm text-green-700 col-span-1">Name:</span>
          <span className="text-sm text-slate-600 col-span-4">
            {storeOrderDetail?.order.user.firstName +
              " " +
              storeOrderDetail?.order.user.lastName}
          </span>
        </p>

        <p className="grid grid-cols-5 gap-3">
          <span className="text-sm text-green-700 col-span-1">Email:</span>
          <span className="text-sm text-slate-600 col-span-4">
            {storeOrderDetail?.order.user.email}
          </span>
        </p>

        <p className="grid grid-cols-5 gap-3">
          <span className="text-sm text-green-700 col-span-1">Phone:</span>
          <span className="text-sm text-slate-600 col-span-4">
            {storeOrderDetail?.order.address.phone}
          </span>
        </p>

        <p className="grid grid-cols-5 gap-3">
          <span className="text-sm text-green-700 col-span-1">Address:</span>
          <span className="text-sm text-slate-600 col-span-4">
            {`${address}, ${barangay}, ${city}, ${province}, ${region}, ${zipcode}`}
          </span>
        </p>
      </section>

      <p className="mt-3 text-slate-800 text-sm font-semibold">Product</p>

      <section className="shadow border border-slate-100 rounded-md p-2">
        <div className="flex gap-1 items-center">
          <div className="relative size-16">
            <Image
              src={
                storeOrderDetail.product.productImages[0].url ||
                assets.image_not_available
              }
              className=" object-contain"
              alt="product_image"
              fill
            />
          </div>
          <div>
            <p className="text-sm text-slate-600 col-span-4">
              {storeOrderDetail.productName}
            </p>
            <p className="text-sm text-slate-600 col-span-4">
              Qty: {storeOrderDetail.quantity}
            </p>
            <p className="text-sm text-slate-600 col-span-4">
              Price: P {Number(storeOrderDetail.productPrice).toFixed(2)}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-3 space-y-1">
        <p className="grid grid-cols-5 gap-3">
          <span className="text-sm text-green-700 col-span-1">
            Payment Method:
          </span>
          <span className="text-sm text-slate-600 col-span-4 uppercase">
            {storeOrderDetail.order.payments[0].paymentMethodType}
          </span>
        </p>

        <p className="grid grid-cols-5 gap-3">
          <span className="text-sm text-green-700 col-span-1">Coupon:</span>
          <span className="text-sm text-slate-600 col-span-4">-</span>
        </p>

        <div className="grid grid-cols-5 gap-3 items-center">
          <span className="text-sm text-green-700 col-span-1">Status:</span>
          <div className="col-span-4">
            <OrderStatus variant={storeOrderDetail.status} />
          </div>
        </div>

        <p className="grid grid-cols-5 gap-3">
          <span className="text-sm text-green-700 col-span-1">Order Date:</span>
          <span className="text-sm text-slate-600 col-span-4">
            {dayjs(storeOrderDetail.order.createdAt).format(
              "M/D/YYYY, hh:mm A, dddd"
            )}
          </span>
        </p>
      </section>
    </Fragment>
  );
}
