import { cn } from "@/lib/utils";

type InputProps = {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  name?: string;
};

export function Input({
  label,
  placeholder,
  defaultValue,
  value,
  onChange,
  type = "text",
  className,
  name,
}: InputProps) {
  const isControlled = value !== undefined;

  return (
    <label className={cn("flex flex-col gap-2 text-sm font-medium text-slate-700", className)}>
      {label}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...(isControlled ? { value, onChange } : { defaultValue })}
        className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(82,103,217,0.12)]"
      />
    </label>
  );
}
