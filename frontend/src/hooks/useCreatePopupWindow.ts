import { usePopupStore } from "./factories/usePopupStore";
import React from "react";

export const useCreatePopupWindow = (Component: React.ReactNode) => {
  const open = usePopupStore((state) => state.open);
  const close = usePopupStore((state) => state.close);
  const isOpen = usePopupStore((state) => state.isOpen);

  const openPopupWindow = () => open(Component);
  const closePopupWindow = () => close();

  return { openPopupWindow, closePopupWindow, isOpen };
};
