import { formDefaults } from "@/lib/data";
import { CardPreview } from "@/components/digicard/card-preview";

export function LivePreview() {
  return (
    <div className="panel p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Live preview</p>
          <p className="text-sm text-slate-500">Updates as your team member edits fields.</p>
        </div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          Auto-saved
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
