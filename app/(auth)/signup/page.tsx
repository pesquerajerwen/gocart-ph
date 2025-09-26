"use client";

import { FormProvider, useForm } from "react-hook-form";
import EmailSentNotice from "./email-sent";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupForm from "./signup-form";
import { SignupSchema, signupSchema } from "@/lib/schema/user";

export default function RegisterPage() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      emailSent: false,
    },
  });

  const { emailSent } = form.watch();

  return (
    <FormProvider {...form}>
      {emailSent ? <EmailSentNotice /> : <SignupForm />}
    </FormProvider>
  );
}
