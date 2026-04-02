import { cn } from "@/lib/utils";

type InputProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  className?: string;
};

export function Input({
  label,
  placeholder,
  defaultValue,
  type = "text",
  className,
}: InputProps) {
  return (
    <label className={cn("flex flex-col gap-2 text-sm font-medium text-slate-700", className)}>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}
