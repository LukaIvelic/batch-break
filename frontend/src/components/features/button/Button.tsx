"use client";

import Image from "next/image";
import { styles } from "./Button.styles";
import React from "react";
import { Spinner } from "../../ui/spinner";

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
    <button className={styles.button(className)} {...rest} disabled={isLoading}>
      {imageSrc && (
        <div className={styles.iconWrapper}>
          <Image
            src={imageSrc}
            fill
            alt="button icon"
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.textWrapper(imageSrc, centerContent, isLoading)}>
        {isLoading && <Spinner />}
        {children}
      </div>
    </button>
  );
}
