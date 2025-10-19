"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="text-center max-w-xl p-8 bg-white">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We're having some trouble. Don't worry, our team is on it! Try again
          later or go back to the homepage.
        </p>

        {/* Image Placeholder */}
        <div className="mb-8">
          <Image
            src={assets.stumbled_robot}
            alt="Error Image"
            width={500}
            height={500}
            layout="intrinsic"
          />
        </div>

        <div>
          <Link href="/">
            <Button variant="secondary">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
