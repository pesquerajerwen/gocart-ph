"use client";

import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useProductDialogStore from "@/zustand/productDialogStore";
import Image from "next/image";

export default function ProductDialog() {
  const { isOpen, showDialog } = useProductDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={showDialog}>
      <DialogContent className="w-2xl sm:max-w-7xl" showCloseButton={false}>
        <DialogTitle className="text-center">Order Details</DialogTitle>
        <p className="mt-3 text-slate-800 text-sm font-semibold">
          Customer Details
        </p>

        <section className="mt-3">
          <p className="flex gap-1">
            <span className="text-sm text-green-700">Name:</span>
            <span className="text-sm text-slate-600">Natnael Biruk</span>
          </p>

          <p className="flex gap-1">
            <span className="text-sm text-green-700">Email:</span>
            <span className="text-sm text-slate-600">
              natibiruk08@gmail.com
            </span>
          </p>

          <p className="flex gap-1">
            <span className="text-sm text-green-700">Phone:</span>
            <span className="text-sm text-slate-600">+0 1234567890</span>
          </p>

          <p className="flex gap-1">
            <span className="text-sm text-green-700">Address:</span>
            <span className="text-sm text-slate-600">
              Nostrud ex rerum qui, Pariatur Sunt debit, Magna esse dolore e,
              73548, Maxime amet esse a
            </span>
          </p>
        </section>

        <p className="mt-3 text-slate-800 text-sm font-semibold">Products</p>

        <section className="mt-3 shadow border border-slate-100 rounded-md p-2">
          <div className="flex gap-1 items-center">
            <Image
              src={assets.product_img1}
              className="size-16"
              alt="product_image"
            />
            <div>
              <p className="text-sm text-slate-600">Ergonomic Mouse</p>
              <p className="text-sm text-slate-600">Qty: 1</p>
              <p className="text-sm text-slate-600">Price: $99</p>
            </div>
          </div>
        </section>

        <section className="mt-3">
          <p className="flex gap-1">
            <span className="text-sm text-green-700">Payment Method:</span>
            <span className="text-sm text-slate-600">Natnael Biruk</span>
          </p>

          <p className="flex gap-1">
            <span className="text-sm text-green-700">Paid:</span>
            <span className="text-sm text-slate-600">Yes</span>
          </p>

          <p className="flex gap-1">
            <span className="text-sm text-green-700">Coupon:</span>
            <span className="text-sm text-slate-600">NEW20 (20% off)</span>
          </p>

          <p className="flex gap-1">
            <span className="text-sm text-green-700">Status:</span>
            <span className="text-sm text-slate-600">PROCESSING</span>
          </p>

          <p className="flex gap-1">
            <span className="text-sm text-green-700">Order Date:</span>
            <span className="text-sm text-slate-600">
              10/3/2025, 7:42:47 PM
            </span>
          </p>
        </section>

        <section className="flex justify-end">
          <Button variant="secondary" onClick={() => showDialog(false)}>
            Close
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
