"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { usePrimaryAddress } from "@/hooks/use-primary-address";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function DefaultCheckbox() {
  const { control, setValue, watch } = useFormContext();

  const { data: primaryAddress } = usePrimaryAddress();

  useEffect(() => {
    setValue("isDefault", !!primaryAddress ? false : true);
  }, [primaryAddress]);

  if (!primaryAddress) return null;

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
