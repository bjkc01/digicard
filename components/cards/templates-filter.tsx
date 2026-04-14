"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { TemplateCategory } from "@/lib/data";

type FilterOption = { label: string; value: TemplateCategory | "" };

const filters: FilterOption[] = [
  { label: "All", value: "" },
  { label: "Corporate", value: "corporate" },
  { label: "Creative", value: "creative" },
  { label: "Bold", value: "bold" },
  { label: "Minimal", value: "minimal" },
];

export function TemplatesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = (searchParams.get("category") ?? "") as TemplateCategory | "";

  function select(value: TemplateCategory | "") {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`/templates${params.size > 0 ? `?${params}` : ""}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => select(f.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
            active === f.value
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
