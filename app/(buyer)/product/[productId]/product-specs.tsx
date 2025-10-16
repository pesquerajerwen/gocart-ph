import StarRating from "@/components/star-rating";
import { ProductWithImages } from "@/lib/types/product";
import { Tag } from "lucide-react";
import { Fragment } from "react";

type Props = {
  product: ProductWithImages;
};

export default function ProductSpecs({ product }: Props) {
  const reviewsCount = 1; // TODO: Get the correct value from the DB

  return (
    <Fragment>
      <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.totalRating} />
        <span className="text-sm text-slate-600">
          {reviewsCount} {reviewsCount === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* Price & Discount */}
      <div className="flex items-start gap-3 mt-5">
        <span className="text-2xl text-green-600 font-bold">
          ${product.offerPrice.toFixed(2)}
        </span>
        {product.actualPrice && (
          <span className="text-xl text-slate-500 font-bold line-through">
            ${product.actualPrice.toFixed(2)}
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
