"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import EnterPasswordForm from "./enter-password";
import SigninForm from "./signin";
import { createClient } from "@/utils/supabase-client";
import { redirect } from "next/navigation";

const loginSchema = z
  .object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().optional(),
    steps: z.enum(["sign in", "enter password"]),
  })
  .refine((data) => data.steps === "sign in" || !!data.password, {
    message: "Password is required",
    path: ["password"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function RegisterPage() {
  const supabase = createClient();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      steps: "sign in",
    },
  });

  const { steps } = form.watch();

  async function onSubmit(data: LoginFormValues) {
    if (data.steps === "sign in") {
      form.setValue("steps", "enter password");
    }

    if (data.steps === "enter password" && data.password) {
      const { data: response, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        return form.setError("password", {
          message: "Password is incorrect. Try again.",
        });
      }

      const searchParams = new URLSearchParams(window.location.search);
      const next = searchParams.get("next");

      return redirect(next || "/");
    }
  }

  return (
    <FormProvider {...form}>
      <fieldset
        disabled={form.formState.isSubmitting}
        className="flex flex-1 justify-center"
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 justify-center items-center px-1"
        >
          {steps === "sign in" && <SigninForm />}
          {steps === "enter password" && <EnterPasswordForm />}
        </form>
      </fieldset>
    </FormProvider>
  );
}
