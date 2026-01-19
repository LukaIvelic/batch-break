import { ReactNode } from "react";
import { create } from "zustand";

interface SheetLayoutItems {
  title?: string;
  description?: string;
  content: ReactNode | null;
}

interface CounterState {
  isOpen: boolean;
  sheetLayoutItems: SheetLayoutItems | null;
  setSheetLayoutItems: (items: SheetLayoutItems) => void;
  invertIsOpen?: () => void;
  open: () => void;
  close: () => void;
  reset: () => void;
}

export const useSheetLayout = create<CounterState>((set) => ({
  isOpen: false,
  sheetLayoutItems: null,
  setSheetLayoutItems: (items: SheetLayoutItems) =>
    set((state) => ({
      sheetLayoutItems: items,
    })),
  invertIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
  reset: () => set(() => ({ isOpen: false, content: null })),
}));
