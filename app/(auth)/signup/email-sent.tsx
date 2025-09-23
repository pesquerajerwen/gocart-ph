"use client";

import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { SignupFormValues } from "./page";

export default function EmailSentNotice() {
  const { watch } = useFormContext<SignupFormValues>();

  const { email } = watch();

  return (
    <div className="flex items-center justify-center p-4 m-auto">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <MailCheck className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Check your email</h1>
        <div>
          <p className="text-slate-600 text-sm">
            We’ve sent a confirmation link to{" "}
          </p>
          <p className="font-medium text-slate-900">{email}</p>
          <p className="text-slate-600 text-sm">
            Please click the link in your inbox to finish creating your account.
          </p>
        </div>

        <div>
          <Button
            className="w-full rounded"
            onClick={() => window.location.reload()}
          >
            Back to Signup
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive an email? Check your spam folder or try signing up
          again.
        </p>
      </div>
    </div>
  );
}
