import { assets } from "@/assets/assets";
import ProductDetails from "@/components/product-details";

export default function ProductPage() {
  const dummyProduct = {
    title: "Smart Home Cleaner",
    images: [
      assets.product_img1,
      assets.product_img1,
      assets.product_img1,
      assets.product_img1,
    ],
    price: 229,
    originalPrice: 299,
    rating: 4,
    reviewsCount: 7,
  };

  return (
    <div className="px-6 max-w-7xl mx-auto my-10">
      <p className="text-sm text-slate-600">Home / Products / Home & Kitchen</p>

      <ProductDetails {...dummyProduct} />
    </div>
  );
}
