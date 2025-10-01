import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";
import { AppSidebar } from "./sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col">
        <header className="flex flex-row items-center px-6 sm:px-12 py-3 sticky top-0 bg-white border-b z-1">
          <Link href="/" className="text-4xl font-semibold text-slate-700">
            <span className="text-green-600">go</span>cart
            <span className="text-green-600 text-5xl leading-0">.</span>
          </Link>
        </header>
        <div className="flex flex-1 ">
          <SidebarProvider className="min-h-0 flex flex-1">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto px-6 sm:px-12 py-8">
              {children}
            </main>
          </SidebarProvider>
        </div>
      </div>
    </React.Fragment>
  );
}
