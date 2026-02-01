"use client";

import { SidebarProvider, SidebarInset } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/layout/sidebar/sidebar/Sidebar";
import SheetLayout from "@/src/components/layout/sheet-layout/SheetLayout";
import { Toaster } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-6 h-full overflow-y-auto">{children}</main>
        <Toaster />
        <SheetLayout />
      </SidebarInset>
    </SidebarProvider>
  );
}
