"use client";
import { usePopupStore } from "@/src/hooks";
import { cn } from "@/src/lib/utils";

export const PopupContainer = () => {
  const { isOpen, content, close } = usePopupStore();

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/10 backdrop-blur-sm transition-opacity duration-300",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
      onClick={close}
    >
      <div
        className={cn(
          "relative bg-background p-6 rounded-[16px] shadow-xl border border-foreground/5 w-150 h-[60vh]",
          "transition-transform duration-300 ease-out",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};
