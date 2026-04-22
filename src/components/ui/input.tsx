"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-black dark:border-white/15 dark:bg-black dark:text-white dark:placeholder:text-white/35 dark:focus:border-white",
        props.className,
      )}
      {...props}
    />
  );
}

export default Input;
