import {
  Home,
  Users,
  Calendar,
  BarChart,
  Settings,
  LogOut,
  type LucideIcon,
  QrCode,
  Package,
  Layers,
  Ticket,
} from "lucide-react";

export interface SidebarSubItem {
  title: string;
  url: string;
}

export interface SidebarMenuItem {
  title: string;
  icon: LucideIcon;
  url?: string;
  items?: SidebarSubItem[];
}

export interface SidebarUserAction {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const sidebarConfig = {
  title: "Batch Break",
  menuLabel: "Menu",
  menuItems: [
    {
      title: "Overview",
      icon: Home,
      url: "/dashboard",
    },
    {
      title: "Scan",
      icon: QrCode,
      items: [
        { title: "QR Code", url: "/dashboard/scan/qr" },
        { title: "Barcode", url: "/dashboard/scan/barcode" },
      ],
    },
    {
      title: "Shipments",
      icon: Package,
      url: "/dashboard/shipments",
    },
    {
      title: "Shipment Issues",
      icon: Ticket,
      url: "/dashboard/shipments/issues",
    },
    {
      title: "Articles",
      icon: Layers,
      url: "/dashboard/articles",
    },
    {
      title: "Calendar",
      icon: Calendar,
      url: "/dashboard/calendar",
    },
    {
      title: "Analytics",
      icon: BarChart,
      url: "/dashboard/analytics",
    },
    {
      title: "Management",
      icon: Users,
      items: [
        { title: "Manage employees", url: "/dashboard/management/employees" },
        { title: "Manage roles", url: "/dashboard/management/roles" },
      ],
    },
  ] as SidebarMenuItem[],
  userActions: [
    {
      label: "Settings",
      icon: Settings,
    },
    {
      label: "Logout",
      icon: LogOut,
    },
  ] as SidebarUserAction[],
};
