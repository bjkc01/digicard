import { DigiCard } from "@/lib/data";
import { CardPreview } from "@/components/digicard/card-preview";

export function CardTile({ card }: { card: DigiCard }) {
  return (
    <div className="subtle-panel overflow-hidden p-4">
      <CardPreview card={card} compact />
      <div className="mt-4 flex items-center justify-between px-1">
        <div>
          <p className="font-semibold text-slate-900">{card.name}</p>
          <p className="text-sm text-slate-500">{card.template}</p>
        </div>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
          Manage
        </button>
      </div>
    </div>
  );
}
