import { assets } from "@/assets/assets";
import ListPagination from "@/components/list-pagination";
import ProductCard from "@/components/product-card";
import { getStore } from "@/lib/dal/store";
import { getStoreProducts } from "@/lib/dal/store-products";
import { MailIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProductPagination from "./pagination";

type Props = {
  params: Promise<{ nameSlug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductsByShopPage({
  params,
  searchParams,
}: Props) {
  const { nameSlug } = await params;

  const { page } = await searchParams;

  console.log("page", page);

  const [products, store] = await Promise.all([
    getStoreProducts({
      slug: nameSlug,
      sortKey: "name",
      sortOrder: "asc",
      size: 20,
      page: Number(page || 1),
      storeId: "",
    }),
    getStore({
      slug: nameSlug,
    }),
  ]);

  if (!store) return redirect("/not-found");

  return (
    <div className="min-h-[70vh] mx-6">
      <div className="max-w-7xl mx-auto bg-slate-50 rounded-xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-6 shadow-xs">
        <div className="relative size-32 sm:size-38 ">
          <Image
            src={store.avatarUrl || assets.image_not_available}
            alt={"store_logo"}
            className="object-cover border-2 border-slate-100 rounded-md"
            fill
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-semibold text-slate-800">
            {store.name}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-lg">
            {store.description}
          </p>
          <div className="text-xs text-slate-500 mt-4 space-y-1"></div>
          <div className="space-y-2 text-sm text-slate-500">
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 text-gray-500 mr-2" />
              <span>{store.address}</span>
            </div>
            <div className="flex items-center">
              <MailIcon className="w-4 h-4 text-gray-500 mr-2" />
              <span>{store.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className=" max-w-7xl mx-auto mb-40">
        <h1 className="text-2xl mt-12">
          Shop <span className="text-slate-800 font-medium">Products</span>
        </h1>
        <div className="mt-5 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-10 mx-auto">
          {products.data.map((product) => (
            <div key={product.id} className="w-36 sm:w-44">
              <Link href={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {products.pagination.totalPage > 1 && (
        <ProductPagination
          currentPage={products.pagination.page}
          totalPages={products.pagination.totalPage}
        />
      )}
    </div>
  );
}
