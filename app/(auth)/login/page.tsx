"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import EnterPasswordForm from "./enter-password";
import SigninForm from "./signin";

const loginSchema = z
  .object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().optional(),
    steps: z.enum(["sign in", "enter password"]),
  })
  .refine(
    (data) => data.steps === "sign in" || data?.password?.length || 0 >= 6,
    {
      message: "Password must be at least 6 characters",
      path: ["password"],
    }
  );

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function RegisterPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      steps: "sign in",
    },
  });

  const { steps } = form.watch();

  function onSubmit(data: LoginFormValues) {
    if (data.steps === "sign in") {
      form.setValue("steps", "enter password");
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 justify-center items-center px-1"
      >
        {steps === "sign in" && <SigninForm />}
        {steps === "enter password" && <EnterPasswordForm />}
      </form>
    </FormProvider>
  );
}
