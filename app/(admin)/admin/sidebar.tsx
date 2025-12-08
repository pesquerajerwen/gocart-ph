import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/utils/tailwind";
import SideBarMenuItem from "./sidebar-menu-item";
import UserAvatar from "./user-avatar";

export type SidebarItem = {
  title: string;
  url: string;
  icon: string;
};

export function AppSidebar() {
  const items: SidebarItem[] = [
    {
      title: "Dashboard",
      url: `/admin`,
      icon: "Home",
    },
    {
      title: "Stores",
      url: `/admin/stores`,
      icon: "Store",
    },
    {
      title: "Approve Store",
      url: `/admin/approve-store`,
      icon: "ShieldCheck",
    },
    {
      title: "Coupons",
      url: `/admin/coupons`,
      icon: "TicketPercent",
    },
  ];

  return (
    <Sidebar
      collapsible="offcanvas"
      className={cn(
        "sticky top-[65px] h-[calc(100vh-65px)] border-r bg-white max-sm:w-16"
      )}
    >
      <SidebarContent>
        <SidebarGroup className="px-0">
          <UserAvatar />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SideBarMenuItem key={index} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
