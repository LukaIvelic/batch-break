import type { SidebarUserAction } from "../sidebar.config";

export const handleUserAction = (
  action: SidebarUserAction,
  logout: () => void
) => {
  if (action.label === "Logout") {
    logout();
  }
  action.onClick?.();
};
