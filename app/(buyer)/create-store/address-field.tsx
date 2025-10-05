"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export default function AddressField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-slate-500">Address</FormLabel>
          <FormControl>
            <Textarea
              className="resize-none h-32"
              placeholder="Enter your store address"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
