"use client";

import { GoogleIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import GoogleSignin from "../../../components/google-signin";

export default function SigninForm() {
  const { control } = useFormContext();

  return (
    <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg">
      <div>
        <h1 className="text-xl font-semibold text-center">Sign in to GoCart</h1>
        <p className="text-sm text-slate-600 text-center">
          Welcome back! Please sign in to continue
        </p>
      </div>

      <div>
        <GoogleSignin />
      </div>

      <div className="flex flex-row items-center gap-4 text-sm text-slate-500">
        <Separator className="flex-1" />
        or
        <Separator className="flex-1" />
      </div>

      <div className="space-y-8">
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

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
      <Separator />

      <p className="text-sm text-slate-500 text-center">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-slate-800  hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
