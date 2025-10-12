import ProductCard from "@/components/product-card";
import { getProductsWithRating } from "@/lib/dal/product";
import Link from "next/link";
import { Fragment } from "react";
import getSearchPayload from "../search-params";

export default async function ProductList() {
  const searchPayload = await getSearchPayload();

  const productsWithRating = await getProductsWithRating(searchPayload);

  if (productsWithRating.data.length <= 0)
    return (
      <div className=" h-full flex justify-center items-center">
        <p className="text-slate-600">No products found</p>
      </div>
    );

  return (
    <Fragment>
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full ">
          {productsWithRating.data.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="col-span-1"
            >
              <div key={product.id} className="w-full transition-all">
                <ProductCard product={product} imageClass="w-32" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
