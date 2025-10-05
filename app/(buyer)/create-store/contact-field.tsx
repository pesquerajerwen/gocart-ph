"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export default function ContactField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="contact"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-slate-500">Contact Number</FormLabel>
          <FormControl>
            <Input placeholder="Enter your store contact number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
