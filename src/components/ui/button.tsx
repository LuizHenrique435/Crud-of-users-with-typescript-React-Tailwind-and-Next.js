import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "secondary" | "ghost";
}

export default function Button({ className, intent = "secondary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        intent === "primary" && "bg-blue-700 text-white hover:bg-blue-600",
        intent === "secondary" && "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
        intent === "ghost" && "text-slate-600 hover:bg-slate-100",
        className,
      )}
      {...props}
    />
  );
}
