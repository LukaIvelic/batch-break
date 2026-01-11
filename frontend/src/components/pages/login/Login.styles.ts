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
  authGroup: cn("flex flex-col gap-2 mt-4"),
  formGroup: cn("flex flex-col gap-2"),
  socialButton: cn("hover:bg-foreground/10 hover:border-foreground/10"),
  buttonContent: cn("flex items-center gap-2 justify-center"),
  submitButton: cn(
    "bg-foreground text-background font-medium border-none hover:bg-foreground/70",
  ),
};
