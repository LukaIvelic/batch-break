"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePopup } from "./usePopup";

export function PopupProvider() {
  const { isOpen, config, close } = usePopup();
  const { title, subtitle, content } = config;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border p-6 shadow-lg animate-in zoom-in-95 outline-none bg-background">
          <div className="mb-4">
            {title && (
              <Dialog.Title className="text-lg font-medium">
                {title}
              </Dialog.Title>
            )}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>

          <div className="py-2">{content}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
