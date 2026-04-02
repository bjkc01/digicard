import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { TemplateTile } from "@/components/digicard/template-tile";
import { templates } from "@/lib/data";

export default function TemplatesPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/templates" />

      <section className="panel p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Templates</p>
            <h1 className="section-title mt-4">Pick a clean starting point</h1>
            <p className="section-copy mt-5">
              Browse template options built for business cards that need to look polished,
              readable, and credible across different industries.
            </p>
          </div>
          <Button href="/create-card" variant="secondary">
            Create custom card
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <TemplateTile key={template.id} template={template} />
          ))}
        </div>
      </section>
    </main>
  );
}
