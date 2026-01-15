import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div className={cn(`flex items-center gap-2 h-fit`, className)}>
      <hr className={cn(`w-full border-t border-foreground/10 my-4`)} />
      <div className={cn(`text-[12px] text-[#5e5e5e] font-medium`)}>OR</div>
      <hr className={cn(`w-full border-t border-foreground/10 my-4`)} />
    </div>
  );
}
