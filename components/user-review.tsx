import { assets } from "@/assets/assets";
import Image from "next/image";
import StarRating from "./star-rating";
import dayjs from "dayjs";

export type UserReview = {
  userName: string;
  avatar_url?: string;
  message: string;
  rating: number;
  dateCreated: string;
};

export default function UserReview({
  userName,
  avatar_url,
  message,
  rating,
  dateCreated,
}: UserReview) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <Image
          src={avatar_url || assets.user_icon}
          alt={"user_avatar"}
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-800">{userName}</p>
          <StarRating rating={rating} />

          <p className="text-sm text-slate-600">
            {dayjs(dateCreated).format("ddd MMM DD YYYY")}
          </p>
          <p className="text-sm text-slate-600 mt-3">{message}</p>
        </div>
      </div>
    </div>
  );
}
