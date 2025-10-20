"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function StreetAddressField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="streetAddress"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Street Address</FormLabel>
          <FormControl>
            <Input placeholder="Street, Building, House No." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
