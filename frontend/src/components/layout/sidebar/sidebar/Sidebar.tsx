"use client";

import { Sidebar, SidebarContent } from "@/src/components/ui/sidebar";
import { useAuth } from "@/src/api/services";
import { AppSidebarHeader } from "../sidebar-header/SidebarHeader";
import { AppSidebarMenu } from "../sidebar-menu/SidebarMenu";
import { AppSidebarActions } from "../sidebar-actions/SidebarActions";
import { AppSidebarFooter } from "../sidebar-footer/SidebarFooter";
import { sidebarConfig } from "../sidebar.config";
import { handleUserAction } from "./Sidebar.utils";

export function AppSidebar() {
  const { user, logout } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader title={sidebarConfig.title} />

      <SidebarContent>
        <AppSidebarActions label="Actions" />
        <AppSidebarMenu
          label={sidebarConfig.menuLabel}
          items={sidebarConfig.menuItems}
        />
      </SidebarContent>

      <AppSidebarFooter
        user={user}
        actions={sidebarConfig.userActions}
        onActionClick={(action) => handleUserAction(action, logout)}
      />
    </Sidebar>
  );
}
