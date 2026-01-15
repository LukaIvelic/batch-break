import type { User } from "@/src/types";

export const getUserInitials = (user: User | null): string => {
  if (!user) return "U";
  return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
};
