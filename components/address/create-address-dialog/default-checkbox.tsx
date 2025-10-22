"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

export default function DefaultCheckbox() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="isDefault"
      render={({ field }) => (
        <FormItem className="flex items-center gap-2 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="font-normal">Set as default address</FormLabel>
        </FormItem>
      )}
    />
  );
}
