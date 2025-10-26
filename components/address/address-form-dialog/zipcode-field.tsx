"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function ZipcodeField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="zipcode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Zip Code</FormLabel>
          <FormControl>
            <Input placeholder="Zip Code" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
