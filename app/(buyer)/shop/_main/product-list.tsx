import ProductCard from "@/components/product-card";
import { ProductWithRating } from "@/lib/types/product";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  products: ProductWithRating[];
};

export default function ProductList({ products }: Props) {
  if (products.length <= 0)
    return (
      <div className=" h-full flex justify-center items-center">
        <p className="text-slate-600">No products found</p>
      </div>
    );

  return (
    <Fragment>
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full ">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="col-span-1"
            >
              <div key={product.id} className="w-40 sm:w-full transition-all">
                <ProductCard product={product} imageClass="w-32" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
