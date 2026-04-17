import type { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import Input from "@/components/ui/input";

export function FormInput({ name, ...props }: ComponentProps<typeof Input> & { name?: string }) {
  const form = useFormContext();
  const fieldName = name ?? String(props.id ?? "");
  const registered = fieldName ? form.register(fieldName) : undefined;
  return <Input {...props} {...registered} />;
}
