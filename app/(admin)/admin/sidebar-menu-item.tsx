"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar";

export default function SideBarMenuItem(item: SidebarItem) {
  const pathname = usePathname();

  const Icon = Icons[item.icon as keyof typeof Icons] as LucideIcon;

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        isActive={pathname === item.url}
        className="px-0 rounded-none transition-all hover:bg-slate-50 h-12 data-[active=true]:bg-slate-100"
      >
        <Link href={item.url} className="pl-6 flex justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-600">
            <Icon className="size-5" />
            <span>{item.title}</span>
          </div>
          {pathname === item.url && (
            <span className="h-full w-1.5 rounded-tl rounded-bl bg-green-600" />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
