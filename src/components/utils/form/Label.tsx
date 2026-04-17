import type { ReactNode } from "react";

export function FormLabel({ children }: { children: ReactNode }) {
  return <label className="mb-1 block text-xs font-medium text-slate-600">{children}</label>;
}
