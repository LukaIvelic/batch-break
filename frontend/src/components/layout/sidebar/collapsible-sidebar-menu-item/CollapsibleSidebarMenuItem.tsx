"use client";

import { useId } from "react";
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
import { cn } from "@/lib/utils";
import type { SidebarMenuItem as SidebarMenuItemType } from "../sidebar.config";

interface CollapsibleSidebarMenuItemProps {
  item: SidebarMenuItemType;
}

export function CollapsibleSidebarMenuItem({
  item,
}: CollapsibleSidebarMenuItemProps) {
  const collapsibleId = useId();

  if (!item.items || item.items.length === 0) return null;

  return (
    <Collapsible asChild id={collapsibleId}>
      <SidebarMenuItem className={cn(`group/collapsible`)}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <item.icon />
            <span>{item.title}</span>
            <ChevronRight
              className={cn(
                `ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90`,
              )}
            />
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
