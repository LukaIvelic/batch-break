"use client";

import Image from "next/image";
import { styles } from "./Button.styles";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imageSrc?: string;
  children: React.ReactNode;
  centerContent?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  children,
  imageSrc,
  centerContent = false,
  className,
  ref,
  ...rest
}: ButtonProps) {
  return (
    <button className={styles.button(className)} {...rest}>
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

      <div className={styles.textWrapper(imageSrc, centerContent)}>
        {children}
      </div>
    </button>
  );
}
