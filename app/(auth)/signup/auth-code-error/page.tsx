"use client";

import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-white rounded-md m-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-yellow-100 p-4 rounded-full"
          >
            <AlertTriangle className="h-10 w-10 text-yellow-600" />
          </motion.div>
        </div>

        <h1 className="text-2xl font-bold text-yellow-900 mt-6">
          Verification Failed
        </h1>

        <p className="text-gray-600 mt-2 leading-relaxed">
          This verification link is either invalid, expired, or has already been
          used. Please request a new verification email and try again.
        </p>

        <div className="mt-6">
          <Button
            className="w-full rounded-xl"
            onClick={() => router.push("/signup")}
          >
            Go Back to Sign Up
          </Button>
        </div>

        <p
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Return to Home
        </p>
      </motion.div>
    </div>
  );
}
