import AccountMenu from "@/components/account-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUserAction } from "@/lib/actions/get-user";
import { capitalize } from "lodash";
import Link from "next/link";
import React from "react";
import { AppSidebar } from "./sidebar";
import "@/app/globals.css";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { storeId: string };
}>) {
  const user = await getCurrentUserAction();

  const { storeId } = await params;

  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col">
        <header className="flex flex-row items-center justify-between px-6 sm:px-12 py-3 sticky top-0 bg-white border-b z-1">
          <Link href="/" className="text-4xl font-semibold text-slate-700">
            <span className="text-green-600">go</span>cart
            <span className="text-green-600 text-5xl leading-0">.</span>
          </Link>
          <div className="flex items-center gap-3">
            {user?.firstName && <p>Hi, {capitalize(user?.firstName)}</p>}
            {user && <AccountMenu user={user} variant="seller" />}
          </div>
        </header>
        <div className="flex flex-1 ">
          <SidebarProvider className="min-h-0 flex flex-1">
            <AppSidebar storeId={storeId} />
            <main className="flex-1 overflow-y-auto px-6 sm:px-12 py-8">
              {children}
            </main>
          </SidebarProvider>
        </div>
      </div>
    </React.Fragment>
  );
}
