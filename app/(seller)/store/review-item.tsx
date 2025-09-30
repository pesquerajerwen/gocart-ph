import { assets } from "@/assets/assets";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  avatar_url?: string;
  dateTime: string;
  name: string;
  message: string;
  category: string;
  rating: number;
  href: string;
};

export default function ReviewItem({
  avatar_url,
  dateTime,
  name,
  message,
  category,
  rating,
  href,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <Image
          src={avatar_url || assets.user_icon}
          alt="avatar"
          className="size-10 rounded-full"
        />
        <div>
          <p className="text-sm text-slate-600">{name}</p>
          <p className="text-sm text-slate-500">{dateTime}</p>
        </div>
      </div>
      <div className="flex max-sm:flex-col justify-between gap-6">
        <p className="text-sm text-slate-500 max-w-80 leading-6">{message}</p>

        <div className="flex flex-col sm:items-end gap-1">
          <p className="text-slate-400 text-sm">{category}</p>
          <p className="text-slate-600 text-sm">Bluetooth Speaker</p>
          <StarRating rating={rating} size={15} />
          <Link href={href}>
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
