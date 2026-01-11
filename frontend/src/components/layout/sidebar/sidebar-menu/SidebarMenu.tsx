"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/src/components/ui/sidebar";
import { SimpleSidebarMenuItem } from "../simple-sidebar-menu-item/SimpleSidebarMenuItem";
import { CollapsibleSidebarMenuItem } from "../collapsible-sidebar-menu-item/CollapsibleSidebarMenuItem";
import type { SidebarMenuItem } from "../sidebar.config";

interface AppSidebarMenuProps {
  label: string;
  items: SidebarMenuItem[];
}

export function AppSidebarMenu({ label, items }: AppSidebarMenuProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) =>
            item.items ? (
              <CollapsibleSidebarMenuItem key={item.title} item={item} />
            ) : (
              <SimpleSidebarMenuItem key={item.title} item={item} />
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
