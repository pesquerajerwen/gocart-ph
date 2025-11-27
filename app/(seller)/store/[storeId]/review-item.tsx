import { assets } from "@/assets/assets";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { StoreReview } from "@/lib/types/store";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

type Props = {
  storeReview: StoreReview;
};

export default function ReviewItem({ storeReview }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="size-10 relative">
          <Image
            src={storeReview.user.avatarUrl || assets.user_icon}
            alt="avatar"
            className="rounded-full object-contain"
            fill
          />
        </div>
        <div>
          <p className="text-sm text-slate-600">
            {storeReview.user.firstName} {storeReview.user.lastName}
          </p>
          <p className="text-sm text-slate-500">
            {dayjs(storeReview.createdAt).format("MMM DD, YYYY")}
          </p>
        </div>
      </div>
      <div className="flex max-sm:flex-col justify-between gap-6">
        <blockquote className="text-sm text-slate-500 max-w-xl leading-6 italic">
          <p>"{storeReview.comment}"</p>
        </blockquote>

        <div className="flex flex-col sm:items-end gap-1">
          <p className="text-slate-400 text-sm">
            {storeReview.product.category.name}
          </p>
          <p className="text-slate-600 text-sm">{storeReview.product.name}</p>
          <StarRating rating={storeReview.rating} size={15} />
          <Link href={`/product/${storeReview.productId}`}>
            <Button
              className="w-full mt-6 rounded text-slate-500 font-light bg-slate-100 hover:bg-slate-200 hover:text-slate-500"
              variant="ghost"
            >
              View Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
