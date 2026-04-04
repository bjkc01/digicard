import { formDefaults } from "@/lib/data";
import { CardPreview } from "@/components/cards/card-preview";

export function LivePreview() {
  return (
    <div className="panel p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Live preview</p>
          <p className="text-sm text-slate-500">Preview the public-facing card before publishing.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          Draft
        </span>
      </div>
      <CardPreview
        card={{
          id: 99,
          ...formDefaults,
          template: "Blueprint",
          color: "from-blue-700 to-cyan-500",
        }}
      />
    </div>
  );
}
