"use client";

import { Separator } from "@/components/ui/separator";
import { ProductWithImages } from "@/lib/types/product";
import ProductForm from "./product-form";
import ProductGallery from "./product-gallery";
import ProductSpecs from "./product-specs";
import SellingPoints from "./selling-points";

type Props = {
  product: ProductWithImages;
};

export default function ProductDetails({ product }: Props) {
  return (
    <section className="flex flex-wrap gap-12">
      <div className="flex max-sm:flex-col-reverse gap-3">
        <ProductGallery productImages={product.productImages} />
      </div>

      <div className="flex flex-col flex-1">
        <ProductSpecs product={product} />

        <ProductForm product={product} />

        <Separator className="my-4" />

        <SellingPoints />
      </div>
    </section>
  );
}
