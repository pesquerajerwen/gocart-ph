import { assets } from "@/assets/assets";
import ProductCard, { Product } from "@/components/product-card";
import { ArrowRightIcon } from "lucide-react";

const products: Product[] = [
  {
    id: "id-1",
    image: assets.product_img1,
    name: "Smart Home Cleaner",
    price: 229,
    rating: 2,
  },
  {
    id: "id-2",
    image: assets.product_img2,
    name: "Ergonomic Mouse",
    price: 99,
    rating: 4,
  },
  {
    id: "id-3",
    image: assets.product_img1,
    name: "Apple Smart Watch",
    price: 199,
    rating: 4,
  },
  {
    id: "id-4",
    image: assets.product_img1,
    name: "Apple Wireless Earbuds",
    price: 89,
    rating: 5,
  },
];

export default function LatestProducts() {
  return (
    <div className="px-6 mt-24 flex flex-col justify-center items-center gap-8 max-w-7xl w-full m-auto">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-800 text-center">
          Latest Products
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <p>Showing 4 of 12 products</p>

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
          <div className="col-span-1">
            <ProductCard key={product.id} {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
