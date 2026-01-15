"use client";

import { useId } from "react";
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
import { cn } from "@/lib/utils";
import type { User } from "@/src/types";
import type { SidebarUserAction } from "../sidebar.config";
import { getUserInitials } from "./SidebarFooter.utils";

interface AppSidebarFooterProps {
  user: User | null;
  actions: SidebarUserAction[];
  onActionClick: (action: SidebarUserAction) => void;
}

export function AppSidebarFooter({
  user,
  actions,
  onActionClick,
}: AppSidebarFooterProps) {
  const dropdownId = useId();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild id={dropdownId}>
              <SidebarMenuButton size="lg" className={cn(`w-full`)}>
                <Avatar className={cn(`h-8 w-8`)}>
                  <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                </Avatar>
                <div className={cn(`flex flex-col items-start text-left`)}>
                  <span className={cn(`text-sm font-medium`)}>
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className={cn(`text-xs text-muted-foreground`)}>
                    {user?.email}
                  </span>
                </div>
                <ChevronDown className={cn(`ml-auto`)} />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className={cn(`[width:var(--radix-dropdown-menu-trigger-width)]`)}
            >
              {actions.map((action) => (
                <DropdownMenuItem
                  key={action.label}
                  onClick={() => onActionClick(action)}
                >
                  <action.icon className={cn(`mr-2 h-4 w-4`)} />
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
