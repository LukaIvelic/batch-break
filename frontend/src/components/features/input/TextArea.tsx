"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/src/lib/utils/cn";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  ref?: React.Ref<HTMLTextAreaElement | null>;
}

export function TextArea({
  placeholder,
  className,
  ref,
  value,
  defaultValue,
  onFocus,
  onBlur,
  ...rest
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const hasValue = useMemo(() => {
    return Boolean(value || defaultValue || inputValue);
  }, [value, defaultValue, inputValue]);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    setInputValue(e.target.value);
    onBlur?.(e);
  };

  const isFloating = isFocused || hasValue;

  return (
    <div className={cn(`bbatch-input-wrapper`)}>
      <label
        htmlFor={"input-" + placeholder}
        className={cn(
          `bbatch-input-label`,
          isFloating && `bbatch-floating`,
          !isFloating && `top-8`,
        )}
      >
        {placeholder}
      </label>
      <textarea
        id={"input-" + placeholder}
        className={cn(`bbatch-input-field resize-none`, className)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
}
