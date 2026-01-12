import React, { useState, useMemo } from "react";
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
  value,
  defaultValue,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const hasValue = useMemo(() => {
    return Boolean(value || defaultValue || inputValue);
  }, [value, defaultValue, inputValue]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setInputValue(e.target.value);
    onBlur?.(e);
  };

  const isFloating = isFocused || hasValue;

  return (
    <div className={styles.wrapper()}>
      <label
        htmlFor={"input-" + placeholder}
        className={styles.label(isFloating)}
      >
        {placeholder}
      </label>
      <input
        id={"input-" + placeholder}
        className={styles.input(className)}
        ref={ref}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
}
