"use client";

import { FormProvider, useForm } from "react-hook-form";
import EmailSentNotice from "./email-sent";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupForm from "./signup-form";

const signupSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  isSubmitting: z.boolean(),
  emailSent: z.boolean(),
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
      isSubmitting: false,
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
