"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageField from "./image-field";
import { useFormContext } from "react-hook-form";
import { CreateProductClientValues } from "@/lib/schema/product";

export default function ProductImages() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateProductClientValues>();

  return (
    <FormField
      control={control}
      name="images"
      render={() => (
        <FormItem>
          <FormLabel className="text-slate-500 mt-10 text-sm">
            Product Images
          </FormLabel>
          <FormControl>
            <div className="flex gap-3 flex-wrap max-w-7xl mt-3 items-end">
              <ImageField index={0} />
              <ImageField index={1} />
              <ImageField index={2} />
              <ImageField index={3} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
