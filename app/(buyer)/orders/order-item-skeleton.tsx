import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/tailwind";
import { Fragment } from "react";

export default function OrderItemSkeleton() {
  return (
    <Fragment>
      {new Array(5).fill(null).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4"
        >
          <div className="col-span-2">
            <div className="flex gap-2">
              <div
                className={cn(
                  "p-2 rounded-sm flex justify-center items-center"
                )}
              >
                <Skeleton className="size-16" />
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <Skeleton className="w-48 h-5" />
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="w-24 h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex justify-center max-sm:hidden">
            <Skeleton className="w-24 h-5" />
          </div>
          <div className="col-span-2 flex flex-col items-center gap-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
          <div className="col-span-1 flex justify-center">
            <Skeleton className="w-full h-7" />
          </div>
        </div>
      ))}
    </Fragment>
  );
}
