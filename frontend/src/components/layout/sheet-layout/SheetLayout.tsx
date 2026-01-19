"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { useSheetLayout } from "@/src/hooks/useSheetLayout";

export default function SheetLayout() {
  const { sheetLayoutItems, isOpen, invertIsOpen } = useSheetLayout();

  if (!sheetLayoutItems) return null;

  const { title, description, content } = sheetLayoutItems;

  return (
    <Sheet open={isOpen} onOpenChange={invertIsOpen}>
      <SheetContent className="max-w-150! p-4">
        <SheetHeader className="gap-0">
          <SheetTitle className="font-medium">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="p-4">{content}</div>
      </SheetContent>
    </Sheet>
  );
}
