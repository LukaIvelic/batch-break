"use client";

import { ChevronRight } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/src/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import type { SidebarMenuItem as SidebarMenuItemType } from "../sidebar.config";
import { collapsibleSidebarMenuItemStyles } from "./CollapsibleSidebarMenuItem.styles";

interface CollapsibleSidebarMenuItemProps {
  item: SidebarMenuItemType;
}

export function CollapsibleSidebarMenuItem({ item }: CollapsibleSidebarMenuItemProps) {
  if (!item.items || item.items.length === 0) return null;

  return (
    <Collapsible asChild>
      <SidebarMenuItem className="group/collapsible">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <item.icon />
            <span>{item.title}</span>
            <ChevronRight className={collapsibleSidebarMenuItemStyles.chevron} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <a href={subItem.url}>{subItem.title}</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
