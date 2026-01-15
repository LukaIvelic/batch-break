import { cn } from "@/lib/utils";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Title({ children, className, ...rest }: TitleProps) {
  return (
    <h1 className={cn(`text-[20px] font-medium`, className)} {...rest}>
      {children}
    </h1>
  );
}
