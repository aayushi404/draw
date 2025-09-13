"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type:"submit" | "reset" | "button" | undefined
}

export const Button = ({ children, className, type}: ButtonProps) => {
  return (
    <button
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};
