"use client";

import { SidebarMenuItem, SidebarMenuButton } from "@/src/components/ui/sidebar";
import type { SidebarMenuItem as SidebarMenuItemType } from "../sidebar.config";

interface SimpleSidebarMenuItemProps {
  item: SidebarMenuItemType;
}

export function SimpleSidebarMenuItem({ item }: SimpleSidebarMenuItemProps) {
  if (!item.url) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
