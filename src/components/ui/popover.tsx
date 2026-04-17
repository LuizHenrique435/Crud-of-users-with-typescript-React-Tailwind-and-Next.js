import type { ReactNode } from "react";

export function Popover({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function PopoverTrigger({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function PopoverPositioner({ children }: { children: ReactNode }) {
  return <div className="absolute right-0 z-10 mt-2">{children}</div>;
}

export function PopoverContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
