import { cn } from "@/src/lib/utils/cn";

export const styles = {
  input: (className?: string) =>
    cn(
      "border border-[#5e5e5e] py-2 px-4 rounded-full outline-none placeholder:text-[#5e5e5e] transition-all focus:ring-1 focus:ring-[#5e5e5e]",
      className,
    ),
};
