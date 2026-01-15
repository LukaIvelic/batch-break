"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AppSidebarActionsProps {
  label: string;
}

export function AppSidebarActions({ label }: AppSidebarActionsProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleTheme}
              tooltip="Toggle theme"
              className={cn("cursor-pointer")}
            >
              <Sun
                className={cn(
                  "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
                )}
              />
              <Moon
                className={cn(
                  "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
                )}
              />
              <span className={cn("ml-2")}>Toggle Theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
