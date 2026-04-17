import { useFormContext } from "react-hook-form";

export function FormMessage({ name }: { name?: string }) {
  const { formState } = useFormContext();
  const key = name ?? "";
  const error = key ? (formState.errors[key] as { message?: string } | undefined) : undefined;
  if (!error?.message) return null;
  return <p className="mt-1 text-xs text-red-600">{error.message}</p>;
}
