import ProductDetails from "@/app/(buyer)/product/[productId]/product-details";
import ProductTabs from "@/app/(buyer)/product/[productId]/product-tabs";
import { getProduct } from "@/lib/dal/product";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { productId } = await params;

  const product = await getProduct({ id: productId });

  if (!product) return redirect("/not-found");

  return (
    <div className="px-6 max-w-7xl mx-auto my-10 space-y-5">
      <p className="text-sm text-slate-600">Home / Products / Home & Kitchen</p>

      <ProductDetails product={product} />
      <ProductTabs product={product} />
    </div>
  );
}
