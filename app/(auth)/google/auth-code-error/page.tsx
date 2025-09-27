"use client";

import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function GoogleAuthErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-white rounded-md m-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100"
      >
        {/* Warning Icon */}
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

        {/* Title */}
        <h1 className="text-2xl font-bold text-yellow-900 mt-6">
          Google Sign-In Failed
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-2 leading-relaxed">
          We couldn’t complete your Google sign-in. This may have happened
          because the link was invalid, expired, or already used.
          <br />
          Please try signing in again.
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <Button
            className="w-full rounded-xl"
            onClick={() => router.push("/login")}
          >
            Try Signing In Again
          </Button>
        </div>

        {/* Secondary Link */}
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
