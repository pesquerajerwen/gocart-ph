"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function LastNameField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center">
            <label className="text-sm">First name</label>
            <label className="text-xs text-slate-600">Optional</label>
          </div>
          <FormControl>
            <Input {...field} placeholder="Last name" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
