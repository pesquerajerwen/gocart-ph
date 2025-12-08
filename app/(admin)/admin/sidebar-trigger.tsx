"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant="ghost" onClick={toggleSidebar}>
      <Menu />
    </Button>
  );
}
