import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { useTheme } from "next-themes";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { theme } = useTheme();

  return (
    <input
      className={cn(
        `
        h-10 w-full rounded-md border px-3 text-sm outline-none transition-colors
        ${
          theme === "dark"
            ? "bg-black text-white border-white/20 placeholder:text-white/40 focus:border-white"
            : "bg-white text-black border-black/20 placeholder:text-black/40 focus:border-black"
        }
        `,
        props.className,
      )}
      {...props}
    />
  );
}

export default Input;
