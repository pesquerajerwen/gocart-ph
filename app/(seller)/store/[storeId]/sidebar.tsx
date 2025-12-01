import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/utils/tailwind";
import SideBarMenuItem from "./sidebar-menu-item";
import StoreLogo from "./store-logo";

export type SidebarItem = {
  title: string;
  url: string;
  icon: string;
};

type Props = {
  storeId: string;
};

export function AppSidebar({ storeId }: Props) {
  const items: SidebarItem[] = [
    {
      title: "Dashboard",
      url: `/store/${storeId}`,
      icon: "Home",
    },
    {
      title: "Add Product",
      url: `/store/${storeId}/add-product`,
      icon: "PlusSquare",
    },
    {
      title: "Manage Products",
      url: `/store/${storeId}/manage-products`,
      icon: "SquarePen",
    },
    {
      title: "Orders",
      url: `/store/${storeId}/orders`,
      icon: "LayoutList",
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
          <StoreLogo storeId={storeId} />
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
