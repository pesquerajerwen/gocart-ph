import { assets } from "@/assets/assets";
import { UserReview } from "@/lib/types/review";
import dayjs from "dayjs";
import _ from "lodash";
import Image from "next/image";
import StarRating from "./star-rating";

export default function ProductReview(userReview: UserReview) {
  const { user } = userReview;

  const name =
    user.firstName && user.lastName
      ? `${_.capitalize(user.firstName)} ${_.capitalize(user.lastName)}`
      : user.email;

  return (
    <div>
      <div className="flex items-start gap-3">
        <Image
          src={user.avatarUrl || assets.user_icon}
          alt={"user_avatar"}
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-800">{name}</p>
          <StarRating rating={userReview.rating} />

          <p className="text-sm text-slate-600">
            {dayjs(userReview.createdAt).format("ddd MMM DD YYYY")}
          </p>
          <p className="text-sm text-slate-600 mt-3">{userReview.comment}</p>
        </div>
      </div>
    </div>
  );
}
