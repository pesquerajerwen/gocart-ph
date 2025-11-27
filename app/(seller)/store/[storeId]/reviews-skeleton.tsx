import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export default function ReviewSkeleton() {
  return (
    <div>
      <Skeleton className="h-6 w-36 my-10" />
      <div className="flex flex-col gap-6 mb-40">
        {new Array(3).fill(null).map((item, index) => (
          <Fragment key={index}>
            <ReviewItemSkeleton />
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function ReviewItemSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="gap-2 flex flex-col">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>
      <div className="flex max-sm:flex-col justify-between gap-6">
        <div className="gap-2 flex flex-col">
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="flex flex-col sm:items-end gap-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-28" />

          <Skeleton className="h-9 w-full mt-6 rounded " />
        </div>
      </div>
    </div>
  );
}
