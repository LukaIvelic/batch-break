import { cn } from "@/lib/utils";

export const sidebarHeaderStyles = {
  container: (isExpanded: boolean) =>
    cn(
      "border-b border-sidebar-border flex flex-row items-center",
      isExpanded ? "p-4 justify-between" : "p-2 justify-center"
    ),
  title: cn("text-lg font-medium whitespace-nowrap"),
};
