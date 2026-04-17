import type { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/ui/input";

export function FormInputMask({ name, mask, ...props }: ComponentProps<typeof Input> & { name?: string; mask: (value: string | number) => string | undefined }) {
  const { control } = useFormContext();
  const fieldName = name ?? String(props.id ?? "");

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <Input
          {...props}
          value={mask(field.value ?? "")}
          onChange={(event) => field.onChange(mask(event.target.value) ?? "")}
        />
      )}
    />
  );
}
