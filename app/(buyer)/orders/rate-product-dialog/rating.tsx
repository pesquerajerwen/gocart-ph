import StarRating from "@/components/star-rating";
import { FormItem } from "@/components/ui/form";
import { CreateProductReviewFormValues } from "@/lib/schema/product-review";
import { cn } from "@/utils/tailwind";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function Rating() {
  const { watch, control } = useFormContext<CreateProductReviewFormValues>();

  const rating = watch("rating");

  const ratingLabel = useMemo(() => {
    switch (rating) {
      case 1:
        return "Terrible";
      case 2:
        return "Poor";
      case 3:
        return "Average";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "No Rating";
    }
  }, [rating]);

  return (
    <div className="flex flex-col items-center my-8 space-y-2">
      <Controller
        control={control}
        name="rating"
        render={({ field }) => (
          <FormItem>
            <StarRating
              rating={field.value}
              size={40}
              gap={3}
              onChange={(value) => field.onChange(value)}
            />
          </FormItem>
        )}
      />
      <span
        className={cn(
          "text-sm text-slate-400",
          rating > 0 ? "visible" : "invisible"
        )}
      >
        {ratingLabel}
      </span>
    </div>
  );
}
