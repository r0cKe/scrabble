"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import { MouseEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode | string;
  type: "button" | "submit";
  disabled: boolean;
  className?: string;
  plusIcon?: boolean;
  onClick?: MouseEventHandler;
};

const Button: NextPage<Props> = ({
  children,
  plusIcon = false,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`flexCenter gap-3 px-4 py-3 rounded-xl bg-primary-purple text-light-white text-sm font-medium max-md:w-full disabled:bg-black/50 disabled:cursor-not-allowed ${className}`}
    >
      {plusIcon && <PlusIcon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
