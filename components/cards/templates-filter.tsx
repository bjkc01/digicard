"use client";

import { useEffect, useState, useTransition } from "react";
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
  const [optimisticActive, setOptimisticActive] = useState<TemplateCategory | "">(active);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setOptimisticActive(active);
  }, [active]);

  useEffect(() => {
    for (const filter of filters) {
      const url = filter.value ? `/templates?category=${filter.value}` : "/templates";
      router.prefetch(url);
    }
  }, [router]);

  function select(value: TemplateCategory | "") {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    const nextUrl = `/templates${params.size > 0 ? `?${params}` : ""}`;
    setOptimisticActive(value);
    startTransition(() => {
      router.push(nextUrl, { scroll: false });
    });
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => select(f.value)}
          aria-pressed={optimisticActive === f.value}
          disabled={isPending && optimisticActive === f.value}
          className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-[background-color,color,transform,box-shadow] duration-200 ${
            optimisticActive === f.value
              ? "bg-slate-900 text-white shadow-[0_10px_22px_rgba(15,23,42,0.16)]"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
