import { cn } from "@/src/lib/utils/cn";

export const styles = {
  main: (className?: string) =>
    cn(
      "mx-auto max-w-[1400px] h-full flex justify-center items-center",
      className,
    ),
  card: cn(
    "w-[325px] h-fit flex flex-col justify-center gap-4 -translate-y-[50%]",
  ),
  header: cn("text-center flex flex-col gap-2"),
  formGroup: cn("flex flex-col gap-2"),
  errorText: cn("text-sm text-red-500 text-center pb-2"),
  submitButton: cn(
    "bg-foreground text-background font-medium border-none hover:bg-foreground/70",
  ),
  buttonContent: cn("flex items-center gap-2 justify-center"),
  footer: cn("flex items-center justify-center gap-2 text-sm text-[#5e5e5e]"),
  footerLink: cn("underline"),
  footerDivider: cn("h-[14px] w-px bg-[#5e5e5e]/60"),
};
