"use client";

import { Home, LayoutList, PlusSquare, SquarePen } from "lucide-react";

import { assets } from "@/assets/assets";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Add Product",
    url: "#",
    icon: PlusSquare,
  },
  {
    title: "Manage Product",
    url: "#",
    icon: SquarePen,
  },
  {
    title: "Orders",
    url: "#",
    icon: LayoutList,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="none" className="border-r bg-white">
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarHeader>
            <div className="flex flex-col justify-center items-center gap-3 my-4">
              <Image
                src={assets.gs_logo}
                alt="store_logo"
                className="size-14 shadow-md rounded-full"
              />
              <p>GreatStack</p>
            </div>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="rounded-none transition-all hover:bg-slate-100 h-10 text-base text-slate-600"
                  >
                    <Link href={item.url} className="px-6 gap-3">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
