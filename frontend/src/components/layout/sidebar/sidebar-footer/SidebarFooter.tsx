"use client";

import { ChevronDown } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import type { User } from "@/src/lib/types";
import type { SidebarUserAction } from "../sidebar.config";
import { sidebarFooterStyles } from "./SidebarFooter.styles";
import { getUserInitials } from "./SidebarFooter.utils";

interface AppSidebarFooterProps {
  user: User | null;
  actions: SidebarUserAction[];
  onActionClick: (action: SidebarUserAction) => void;
}

export function AppSidebarFooter({ user, actions, onActionClick }: AppSidebarFooterProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className={sidebarFooterStyles.menuButton}>
                <Avatar className={sidebarFooterStyles.avatar}>
                  <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                </Avatar>
                <div className={sidebarFooterStyles.userInfo}>
                  <span className={sidebarFooterStyles.userName}>
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className={sidebarFooterStyles.userEmail}>{user?.email}</span>
                </div>
                <ChevronDown className={sidebarFooterStyles.chevron} />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className={sidebarFooterStyles.dropdown}>
              {actions.map((action) => (
                <DropdownMenuItem key={action.label} onClick={() => onActionClick(action)}>
                  <action.icon className={sidebarFooterStyles.actionIcon} />
                  <span>{action.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
