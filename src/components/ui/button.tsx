import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "secondary" | "ghost";
}

export default function Button({
  className,
  intent = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        intent === "primary" &&
          "border border-black bg-black text-white hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white",
        intent === "secondary" &&
          "border border-black/15 bg-white text-black hover:bg-black hover:text-white dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black",
        intent === "ghost" &&
          "border border-transparent bg-transparent text-black/65 hover:border-black/10 hover:bg-black/5 hover:text-black dark:text-white/65 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
