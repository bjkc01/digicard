import { CardPreview } from "@/components/cards/card-preview";

const previewCard = {
  color: "from-blue-700 to-cyan-500",
  company: "Your organization",
  email: "you@example.com",
  id: 99,
  linkedin: "linkedin.com/in/yourname",
  name: "Your Name",
  phone: "+1 (555) 000-0000",
  template: "Blueprint",
  title: "Professional title",
  website: "yourwebsite.com",
};

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
        card={previewCard}
      />
    </div>
  );
}
