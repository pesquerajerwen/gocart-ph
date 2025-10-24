import ProductCard from "@/components/product-card";
import { getProductsWithRating } from "@/lib/dal/product";
import { ArrowRightIcon } from "lucide-react";

export default async function LatestProducts() {
  const { data: products } = await getProductsWithRating({
    size: 8, // TODO: get the product with the highest sales
  });

  return (
    <div className="px-6 mt-24 flex flex-col justify-center items-center gap-8 max-w-7xl w-full m-auto">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Best Selling
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <p>Showing 8 of 12 products</p>

          <p className="flex items-center gap-1 text-green-500 cursor-pointer">
            View more
            <ArrowRightIcon
              className="group-hover:ml-2 transition-all"
              size={18}
            />{" "}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 w-full">
        {products.map((product) => (
          <div key={product.id} className="col-span-1">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
