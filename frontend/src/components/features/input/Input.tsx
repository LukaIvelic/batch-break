import React from "react";
import { styles } from "./Input.styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  ref?: React.Ref<HTMLInputElement | null>;
}

export function Input({
  placeholder,
  className,
  ref,
  type = "text",
  ...rest
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      className={styles.input(className)}
      ref={ref}
      type={type}
      {...rest}
    />
  );
}
