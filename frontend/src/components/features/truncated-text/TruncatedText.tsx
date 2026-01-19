import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";

const truncateText = (
  children: ReactNode,
  maxLength: number,
): string | null => {
  if (typeof children !== "string") return null;
  if (children.length <= maxLength) return children;
  return children.substring(0, maxLength - 3) + "...";
};

interface TruncatedTextProps {
  children: ReactNode;
  maxLength: number;
}

export function TruncatedText(props: TruncatedTextProps) {
  const { children, maxLength } = props;
  const truncatedText = truncateText(children, maxLength);

  if (!truncatedText) return children;

  return (
    <HoverCard>
      <HoverCardTrigger asChild className="hover:cursor-default">
        <div>{truncatedText}</div>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        side="top"
        className={`
                    w-fit 
                    py-1 px-3
                    bg-foreground text-background
                    -translate-x-3.5
                    text-[14px]
                `}
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
