import { cn } from "@/lib/utils";

export const sidebarFooterStyles = {
  menuButton: cn("w-full"),
  avatar: cn("h-8 w-8"),
  userInfo: cn("flex flex-col items-start text-left"),
  userName: cn("text-sm font-medium"),
  userEmail: cn("text-xs text-muted-foreground"),
  chevron: cn("ml-auto"),
  dropdown: cn("w-[--radix-dropdown-menu-trigger-width]"),
  actionIcon: cn("mr-2 h-4 w-4"),
};
