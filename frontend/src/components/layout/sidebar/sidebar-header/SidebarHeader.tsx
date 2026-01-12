"use client";

import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { sidebarHeaderStyles } from "./SidebarHeader.styles";

interface AppSidebarHeaderProps {
  title: string;
}

export function AppSidebarHeader({ title }: AppSidebarHeaderProps) {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <SidebarHeader className={sidebarHeaderStyles.container(isExpanded)}>
      {isExpanded && <h2 className={sidebarHeaderStyles.title}>{title}</h2>}
      <SidebarTrigger />
    </SidebarHeader>
  );
}
