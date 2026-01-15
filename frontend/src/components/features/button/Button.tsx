"use client";

import Image from "next/image";
import React from "react";
import { Spinner } from "../../ui/spinner";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  imageSrc?: string;
  centerContent?: boolean;
}

export function Button({
  children,
  imageSrc,
  isLoading,
  centerContent = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`bbatch-btn ${className ?? ""}`}
      {...rest}
      disabled={isLoading}
    >
      {imageSrc && (
        <div className="bbatch-btn-icon-wrapper">
          <Image
            src={imageSrc}
            fill
            alt="button icon"
            className="bbatch-btn-image"
          />
        </div>
      )}

      <div
        className={cn(
          `bbatch-btn-text-wrapper`,
          !imageSrc || centerContent ? "" : "-translate-x-5",
          isLoading ? "justify-center" : "justify-start",
        )}
      >
        {isLoading && <Spinner />}
        {children}
      </div>
    </button>
  );
}
