"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { LoginFormValues } from "./page";

export default function EnterPasswordForm() {
  const { control, setValue } = useFormContext<LoginFormValues>();

  return (
    <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg">
      <div>
        <h1 className="text-xl font-semibold text-center">Enter Password</h1>
        <p className="text-sm text-slate-600 text-center">
          Enter the password associated with your account
        </p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm text-slate-600 text-center">
            pesquerajerwen@gmail.com
          </p>
          <PencilLine
            className="size-3 cursor-pointer text-slate-900"
            onClick={() => setValue("steps", "sign in")}
          />
        </div>
      </div>

      <div className="space-y-8">
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <label className="text-sm">Password</label>
                <Link href="#" className="text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput {...field} placeholder="Enter your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full">Continue</Button>
      </div>
    </div>
  );
}
