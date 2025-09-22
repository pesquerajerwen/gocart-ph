"use client";

import { GoogleIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import EmailField from "./email-field";
import PasswordField from "./password-field";
import FirstNameField from "./first-name-field";
import LastNameField from "./last-name-field";

const signupSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export default function RegisterPage() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignupFormValues) {}

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 justify-center items-center px-1"
      >
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg">
          <div>
            <h1 className="text-xl font-semibold text-center">
              Create your account
            </h1>
            <p className="text-sm text-slate-600 text-center">
              Welcome back! Please sign in to continue
            </p>
          </div>

          <div>
            <Button variant="outline" className="w-full">
              <GoogleIcon className="size-5" />
              Continue with Google
            </Button>
          </div>

          <div className="flex flex-row items-center gap-4 text-sm text-slate-500">
            <Separator className="flex-1" />
            or
            <Separator className="flex-1" />
          </div>

          <div className="space-y-8">
            <div className="flex justify-between gap-4">
              <FirstNameField />
              <LastNameField />
            </div>
            <EmailField />
            <PasswordField />

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </div>
          <Separator />

          <p className="text-sm text-slate-500 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-slate-800 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
