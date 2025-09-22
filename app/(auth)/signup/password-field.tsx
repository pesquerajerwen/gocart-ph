"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { useFormContext } from "react-hook-form";

export default function PasswordField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <label className="text-sm">Password</label>
          <FormControl>
            <PasswordInput {...field} placeholder="Enter your password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
