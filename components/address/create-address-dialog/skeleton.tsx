import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function Field() {
  return (
    <div>
      <Skeleton className="h-[14px] w-full" />
      <Skeleton className="h-[36px] w-full mt-2" />
    </div>
  );
}

export default function FormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3 items-start">
        <Field />
        <Field />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 items-start">
        <Field />
        <Field />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 items-start">
        <Field />
        <Field />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 items-start">
        <Field />
        <Field />
      </div>
      <div className="flex items-center gap-1">
        <Skeleton className="size-[16px]" />
        <Skeleton className="h-[14px] w-full" />
      </div>
      <Separator />
      <div className="flex items-center justify-end gap-2">
        <Skeleton className="w-24 h-9" />
        <Skeleton className="w-24 h-9" />
      </div>
    </div>
  );
}
