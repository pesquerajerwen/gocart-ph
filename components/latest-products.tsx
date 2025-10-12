import { assets } from "@/assets/assets";
import ProductCard from "@/components/product-card";
import { ProductWithRating } from "@/lib/types/product";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const products: ProductWithRating[] = [
  {
    id: "prod_1",
    name: "Organic Green Tea",
    description: "Refreshing and antioxidant-rich premium green tea leaves.",
    actualPrice: 299,
    offerPrice: 249,
    stock: 120,
    rating: 4.6,
    status: "active",
    storeId: "store_eco_1",
    primaryImageUrl: assets.product_img1,
    createdAt: new Date("2024-10-01T10:00:00Z"),
    updatedAt: new Date("2025-01-05T12:00:00Z"),
    categorySlug: "",
    totalRating: 10,
    totalSales: 10,
  },
  {
    id: "prod_2",
    name: "Artisan Whole Wheat Bread",
    description: "Handcrafted bread made from 100% whole wheat flour.",
    actualPrice: 180,
    offerPrice: 150,
    stock: 60,
    rating: 4.8,
    status: "active",
    storeId: "store_eco_1",
    primaryImageUrl: assets.product_img2,
    createdAt: new Date("2024-11-12T09:00:00Z"),
    updatedAt: new Date("2025-02-01T15:00:00Z"),
    categorySlug: "",
    totalRating: 10,
    totalSales: 10,
  },
  {
    id: "prod_3",
    name: "Reusable Bamboo Straw Set",
    description: "Eco-friendly bamboo straws with cleaning brush.",
    actualPrice: 120,
    offerPrice: 99,
    stock: 300,
    rating: 4.3,
    status: "active",
    storeId: "store_green_2",
    primaryImageUrl: assets.product_img3,
    createdAt: new Date("2024-09-10T11:00:00Z"),
    updatedAt: new Date("2025-01-22T10:00:00Z"),
    categorySlug: "",
    totalRating: 10,
    totalSales: 10,
  },
  {
    id: "prod_4",
    name: "Natural Almond Butter",
    description: "Creamy almond butter with no added sugar or preservatives.",
    actualPrice: 450,
    offerPrice: 399,
    stock: 90,
    rating: 4.7,
    status: "active",
    storeId: "store_naturals_3",
    primaryImageUrl: assets.product_img4,
    createdAt: new Date("2024-08-22T13:00:00Z"),
    updatedAt: new Date("2025-01-03T16:00:00Z"),
    categorySlug: "",
    totalRating: 10,
    totalSales: 10,
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
