import { cn } from "@/lib/utils";

export const collapsibleSidebarMenuItemStyles = {
  chevron: cn(
    "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
  ),
};
