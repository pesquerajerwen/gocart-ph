import { assets } from "@/assets/assets";
import { ProductWithImagesAndStore } from "@/lib/types/product";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: ProductWithImagesAndStore;
};

export default function ProductDescription({ product }: Props) {
  return (
    <React.Fragment>
      <p className="text-sm text-slate-600">{product.description}</p>

      <div className="flex gap-3 items-center mt-12">
        <div className="relative size-12">
          <Image
            src={product.store.avatarUrl || assets.image_not_available}
            alt="store_logo"
            fill
            className="object-cover border rounded-full"
          />
        </div>
        <div>
          <p className="text-sm text-slate-800">
            Product By {product.store.name}
          </p>
          <Link
            href={`/shop/${product.store.slug}`}
            className="text-green-600 flex gap-1 items-center text-sm"
          >
            View Store
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
