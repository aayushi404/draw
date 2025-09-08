"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  clickAction:() => void
}

export const Button = ({ children, className, clickAction }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={clickAction}
    >
      {children}
    </button>
  );
};
