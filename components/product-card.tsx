import { ProductWithPrimaryImage } from "@/lib/types/product";
import { cn } from "@/utils/tailwind";
import Image from "next/image";
import StarRating from "./star-rating";
import { formatCurrency } from "@/lib/helpers";

type Props = {
  product: ProductWithPrimaryImage;
  imageClass?: string;
};

function ProductCard({ product, imageClass }: Props) {
  return (
    <div className="flex flex-col gap-2 group cursor-pointer">
      <div
        className={cn(
          "bg-slate-100 p-4 rounded-sm flex justify-center items-center"
        )}
      >
        <div className={cn("relative size-32 max-h-40", imageClass)}>
          <Image
            src={product.primaryImageUrl}
            alt={product.name}
            className="object-contain group-hover:scale-110 transition-all"
            sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 12rem"
            fill
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm gap-6">
          <p className="line-clamp-2">{product.name}</p>
          <p className="whitespace-nowrap">
            {formatCurrency(product.offerPrice, "PHP")}
          </p>
        </div>
        <StarRating
          rating={Math.floor(product.totalRating / product.totalReviews)}
        />
      </div>
    </div>
  );
}

export default ProductCard;
