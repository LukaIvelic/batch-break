import { cn } from "@/lib/utils";

interface SubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Subtitle({ children, className, ...rest }: SubtitleProps) {
  return (
    <h1 className={cn(`text-[16px] text-foreground/70`, className)} {...rest}>
      {children}
    </h1>
  );
}
