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
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/store",
    icon: Home,
  },
  {
    title: "Add Product",
    url: "/store/add-product",
    icon: PlusSquare,
  },
  {
    title: "Manage Products",
    url: "/store/manage-products",
    icon: SquarePen,
  },
  {
    title: "Orders",
    url: "/store/orders",
    icon: LayoutList,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="none"
      className={cn(
        "sticky top-[65px] h-[calc(100vh-65px)] border-r bg-white",
        isMobile && "w-16"
      )}
    >
      <SidebarContent>
        <SidebarGroup className="px-0">
          {!isMobile && (
            <SidebarHeader className="data-[state=collapsed]:hidden">
              <div className="flex flex-col justify-center items-center gap-3 my-4">
                <Image
                  src={assets.gs_logo}
                  alt="store_logo"
                  className="size-14 shadow-md rounded-full"
                />
                <p>GreatStack</p>
              </div>
            </SidebarHeader>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="px-0 rounded-none transition-all hover:bg-slate-50 h-10 data-[active=true]:bg-slate-100"
                  >
                    <Link
                      href={item.url}
                      className="pl-6 flex justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 text-slate-500">
                        <item.icon className="size-5" />
                        {!isMobile && <span>{item.title}</span>}
                      </div>
                      {pathname === item.url && (
                        <span className="h-full w-1 rounded-tl-md rounded-bl-md bg-green-600" />
                      )}
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
