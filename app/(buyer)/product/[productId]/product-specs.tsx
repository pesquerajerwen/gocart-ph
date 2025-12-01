import StarRating from "@/components/star-rating";
import { formatCurrency } from "@/lib/helpers";
import { ProductWithImages } from "@/lib/types/product";
import { Tag } from "lucide-react";
import { Fragment } from "react";

type Props = {
  product: ProductWithImages;
};

export default function ProductSpecs({ product }: Props) {
  const reviewCount = Math.floor(product.totalRating / product.totalReviews);

  console.log(product);

  return (
    <Fragment>
      <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.totalRating} />
        <span className="text-sm text-slate-600">
          {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* Price & Discount */}
      <div className="flex items-start gap-3 mt-5">
        <span className="text-2xl text-green-600 font-bold">
          {formatCurrency(product.offerPrice, "PHP", "en-PH")}
        </span>
        {product.actualPrice && (
          <span className="text-xl text-slate-500 font-bold line-through">
            {formatCurrency(product.actualPrice, "PHP", "en-PH")}
          </span>
        )}
      </div>

      {/* Savings Info */}
      {product.actualPrice && (
        <div className="flex items-center gap-2 text-slate-500">
          <Tag className="size-4" />
          Save{" "}
          {Math.round(
            ((product.actualPrice - product.offerPrice) / product.actualPrice) *
              100
          )}
          % right now
        </div>
      )}
    </Fragment>
  );
}
