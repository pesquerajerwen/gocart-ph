"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function EmailField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <label className="text-sm">Email address</label>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter your email address"
              type="email"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
