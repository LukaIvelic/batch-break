import { cn } from "@/src/lib/utils/cn";

export const styles = {
  container: (className?: string) =>
    cn("flex items-center gap-2 h-fit", className),
  line: cn("w-full border-t border-foreground/10 my-4"),
  text: cn("text-[12px] text-[#5e5e5e] font-medium"),
};
