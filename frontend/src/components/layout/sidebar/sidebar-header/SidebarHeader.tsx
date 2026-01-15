"use client";

import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AppSidebarHeaderProps {
  title: string;
}

export function AppSidebarHeader({ title }: AppSidebarHeaderProps) {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <SidebarHeader
      className={cn(
        `border-b border-sidebar-border flex flex-row items-center`,
        isExpanded ? `p-4 justify-between` : `p-2 justify-center`,
      )}
    >
      {isExpanded && (
        <h2 className={cn(`text-lg font-medium whitespace-nowrap`)}>{title}</h2>
      )}
      <SidebarTrigger />
    </SidebarHeader>
  );
}
