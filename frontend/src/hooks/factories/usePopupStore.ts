import { create } from "zustand";
import React from "react";

interface PopupState {
  isOpen: boolean;
  content: React.ReactNode | null;
  open: (content: React.ReactNode) => void;
  close: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  content: null,
  open: (content) => set({ isOpen: true, content }),
  close: () => set({ isOpen: false, content: null }),
}));
