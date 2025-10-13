import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserReviewComponent, {
  UserReview,
} from "../../../../components/user-review";
import dayjs from "dayjs";
import React from "react";
import { Separator } from "../../../../components/ui/separator";

type Props = {
  description: string;
  reviews: UserReview[];
};

export const userReviews: UserReview[] = [
  {
    userName: "Sophia Reyes",
    message:
      "Absolutely love this product! The build quality feels premium and shipping was super fast.",
    rating: 5,
    dateCreated: dayjs("2025-09-12").format("ddd MMM DD YYYY"), // Fri Sep 12 2025
  },
  {
    userName: "Liam Chen",
    message:
      "Pretty good overall. Setup was easy, but I wish the instructions were a bit clearer.",
    rating: 4,
    dateCreated: dayjs("2025-09-10").format("ddd MMM DD YYYY"),
  },
  {
    userName: "Amira Patel",
    message:
      "The product works as described, but shipping took longer than expected.",
    rating: 3,
    dateCreated: dayjs("2025-08-30").format("ddd MMM DD YYYY"),
  },
  {
    userName: "Noah Smith",
    message:
      "Not satisfied with the quality. It stopped working after a week of use.",
    rating: 2,
    dateCreated: dayjs("2025-08-15").format("ddd MMM DD YYYY"),
  },
  {
    userName: "Hannah Lee",
    message:
      "Exceeded my expectations! Customer support was very helpful when I had questions.",
    rating: 5,
    dateCreated: dayjs("2025-07-22").format("ddd MMM DD YYYY"),
  },
];

export function ProductDescription() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Tabs defaultValue="reviews">
        <TabsList className="w-full">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-3">
          <p className="text-sm text-slate-600">
            Mouse with a sleek design. It's perfect for any room. It's made of
            high-quality materials and comes with a lifetime warranty.
          </p>
        </TabsContent>
        <TabsContent value="reviews" className="py-3">
          <div className="space-y-8">
            {userReviews.map((userReview, index) => (
              <React.Fragment key={index}>
                <UserReviewComponent {...userReview} />
                {index < userReviews.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
