import { cn } from "@/src/lib/utils/cn";

export const styles = {
  wrapper: (className?: string) => cn("relative w-full", className),
  label: (isFloating: boolean) =>
    cn(
      "text-[#5e5e5e] transition-all absolute left-4 px-1 pointer-events-none -translate-y-1/2",
      isFloating ? "top-0 text-xs bg-background" : "top-1/2",
      "select-none",
    ),
  input: (className?: string) =>
    cn(
      "border border-[#d3d3d3] py-3 px-4 rounded-full outline-none w-full placeholder:text-transparent transition-all focus:ring-1 focus:ring-[#5e5e5e]",
      className,
    ),
};
