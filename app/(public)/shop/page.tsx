import { assets } from "@/assets/assets";
import ProductCard, { Product } from "@/components/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import Link from "next/link";

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
    image: assets.product_img3,
    name: "Apple Smart Watch",
    price: 199,
    rating: 4,
  },
  {
    id: "id-4",
    image: assets.product_img4,
    name: "Apple Wireless Earbuds",
    price: 89,
    rating: 5,
  },
  {
    id: "id-5",
    image: assets.product_img5,
    name: "Smart Home Cleaner",
    price: 229,
    rating: 2,
  },
  {
    id: "id-6",
    image: assets.product_img6,
    name: "Ergonomic Mouse",
    price: 99,
    rating: 4,
  },
  {
    id: "id-7",
    image: assets.product_img7,
    name: "Apple Smart Watch",
    price: 199,
    rating: 4,
  },
  {
    id: "id-8",
    image: assets.product_img8,
    name: "Smart watch white",
    price: 199,
    rating: 4,
  },
  {
    id: "id-9",
    image: assets.product_img9,
    name: "Apple aorpods",
    price: 229,
    rating: 2,
  },
  {
    id: "id-10",
    image: assets.product_img10,
    name: "Smart watch",
    price: 229,
    rating: 3,
  },
  {
    id: "id-11",
    image: assets.product_img11,
    name: "Ergonomic mouse",
    price: 229,
    rating: 4,
  },
  {
    id: "id-12",
    image: assets.product_img12,
    name: "Smart Home Cleaner",
    price: 229,
    rating: 5,
  },
  {
    id: "id-13",
    image: assets.product_img1,
    name: "Smart Home Cleaner",
    price: 229,
    rating: 2,
  },
  {
    id: "id-14",
    image: assets.product_img2,
    name: "Ergonomic Mouse",
    price: 99,
    rating: 4,
  },
  {
    id: "id-15",
    image: assets.product_img3,
    name: "Apple Smart Watch",
    price: 199,
    rating: 4,
  },
];

export default function ShopPage() {
  return (
    <div className="px-6 max-w-7xl mx-auto mt-10 mb-40 space-y-8 ">
      <h1 className="text-2xl text-slate-800">All Products</h1>
      <div className="flex flex-wrap gap-8 w-full">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div key={product.id} className=" w-40 sm:w-60 transition-all">
              <ProductCard {...product} imageClass="max-h-32" />
            </div>
          </Link>
        ))}
      </div>
      <Pagination className="mt-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
