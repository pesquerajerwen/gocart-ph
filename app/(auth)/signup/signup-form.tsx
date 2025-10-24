"use client";

import GoogleSignin from "@/components/google-signin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signupAction } from "@/lib/actions/signup";
import { SignupSchema } from "@/lib/schema/user";
import { createClient } from "@/utils/supabase-client";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import EmailField from "./email-field";
import FirstNameField from "./first-name-field";
import LastNameField from "./last-name-field";
import PasswordField from "./password-field";
import { Suspense } from "react";

export default function SignupForm() {
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useFormContext<SignupSchema>();

  async function onSubmit(data: SignupSchema) {
    const supabase = createClient();

    const { success, message } = await signupAction({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    if (!success) {
      return toast.error(message);
    }

    const { data: response, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      return toast.error(error.message);
    }

    setValue("emailSent", true);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 justify-center items-center px-1"
    >
      <fieldset
        disabled={isSubmitting}
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg  disabled:cursor-not-allowed"
      >
        <div>
          <h1 className="text-xl font-semibold text-center">
            Create your account
          </h1>
          <p className="text-sm text-slate-600 text-center">
            Welcome! Please fill out the form to sign up
          </p>
        </div>

        <div>
          <Suspense>
            <GoogleSignin />
          </Suspense>
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Continue"}
          </Button>
        </div>
        <Separator />

        <p className="text-sm text-slate-500 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-800 hover:underline">
            Sign in
          </Link>
        </p>
      </fieldset>
    </form>
  );
}
