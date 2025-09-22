import "@/app/globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <div className="px-6 max-w-7xl m-auto py-3 flex flex-row gap-6 items-center ">
        <Link href="/" className="text-4xl font-semibold text-slate-700">
          <span className="text-green-600">go</span>cart
          <span className="text-green-600 text-5xl leading-0">.</span>
        </Link>
      </div>
      <div className="min-h-[60vh] py-8 flex items-center bg-green-600">
        {children}
      </div>
      <Footer />
    </React.Fragment>
  );
}
