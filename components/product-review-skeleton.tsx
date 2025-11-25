import { Skeleton } from "./ui/skeleton";

export default function ProductReviewSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {new Array(3).fill(null).map((_, index) => (
        <div key={index} className="flex items-start gap-3">
          <Skeleton className="size-[40px] aspect-square rounded-full" />
          <div className="w-full">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[12px] w-28" />
              <Skeleton className="h-[12px] w-18" />
              <Skeleton className="h-[12px] w-24" />
              <Skeleton className="h-[12px] w-2/3 mt-3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
