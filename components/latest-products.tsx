import ProductCard from "@/components/product-card";
import { getProductsWithRating } from "@/lib/dal/product";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default async function LatestProducts() {
  const { data: products } = await getProductsWithRating({
    sortKey: "createdAt",
    sortOrder: "desc",
    size: 4,
  });

  return (
    <div className="px-6 mt-24 flex flex-col justify-center items-center gap-8 max-w-7xl w-full m-auto">
      <div className="space-y-3">
        <Link href={"/shop"}>
          <h2 className="text-2xl font-semibold text-slate-800 text-center">
            Latest Products
          </h2>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <p>Showing 4 of 12 products</p>

          <p className="flex items-center gap-1 text-green-500 cursor-pointer">
            View more
            <ArrowRightIcon
              className="group-hover:ml-2 transition-all"
              size={18}
            />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 w-full">
        {products.map((product) => (
          <div key={product.id} className="col-span-1">
            <Link href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
