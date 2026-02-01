import { create } from "zustand";
import { ReactNode } from "react";

interface PopupConfig {
  title?: ReactNode;
  subtitle?: ReactNode;
  content?: ReactNode;
  closeText?: string;
  confirmText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

interface PopupState {
  isOpen: boolean;
  config: PopupConfig;
  open: (config: PopupConfig) => void;
  close: () => void;
}

export const usePopup = create<PopupState>((set) => ({
  isOpen: false,
  config: {},
  open: (config) => set({ isOpen: true, config }),
  close: () => set({ isOpen: false, config: {} }),
}));
