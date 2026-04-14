import { Suspense } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { TemplateTile } from "@/components/cards/template-tile";
import { TemplatesFilter } from "@/components/cards/templates-filter";
import { templates, type DigiCard, type DigiCardTemplate, type TemplateCategory } from "@/lib/data";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";

function buildPreviewCard(template: DigiCardTemplate, workspaceView: Awaited<ReturnType<typeof getWorkspaceView>>): DigiCard {
  return {
    color: template.accent,
    company: workspaceView.settings.card.company || "University or Company",
    email: workspaceView.settings.profile.email || "you@example.com",
    id: `gallery-preview-${template.id}`,
    linkedin: workspaceView.settings.card.linkedin || "linkedin.com/in/yourname",
    name: workspaceView.settings.profile.name || "Your Name",
    phone: workspaceView.settings.card.phone || "+1 (555) 000-0000",
    qrPreference: workspaceView.settings.card.qrPreference,
    template: template.name,
    title: workspaceView.settings.profile.title || "Student or Early Professional",
    website: workspaceView.settings.profile.website || "yourportfolio.com",
  };
}

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const workspaceUser = await requireWorkspaceUser("/templates");
  const workspaceView = await getWorkspaceView(workspaceUser);
  const { category } = await searchParams;

  const validCategories: TemplateCategory[] = ["corporate", "creative", "bold", "minimal"];
  const activeCategory = validCategories.includes(category as TemplateCategory)
    ? (category as TemplateCategory)
    : null;

  const visibleTemplates = activeCategory
    ? templates.filter((t) => t.category === activeCategory)
    : templates;

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/templates" email={workspaceUser.email} userName={workspaceUser.name} />

      <section className="panel p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Templates</p>
            <h1 className="section-title mt-4">Pick a clean starting point</h1>
            <p className="section-copy mt-5">
              Browse the available directions for your workspace card. Your current default is{" "}
              {workspaceView.summary.selectedTemplateName}.
            </p>
          </div>
          <Button href="/create-card" variant="secondary">
            Edit workspace card
          </Button>
        </div>

        {/* Category filter */}
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="flex gap-2">
                {["All", "Corporate", "Creative", "Bold", "Minimal"].map((label) => (
                  <div key={label} className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
                ))}
              </div>
            }
          >
            <TemplatesFilter />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleTemplates.map((template) => (
            <TemplateTile
              key={template.id}
              isSelected={template.id === workspaceView.settings.defaultTemplateId}
              previewCard={buildPreviewCard(template, workspaceView)}
              template={template}
            />
          ))}
        </div>

        {visibleTemplates.length === 0 && (
          <p className="mt-16 text-center text-sm text-slate-500">
            No templates in this category yet.
          </p>
        )}
      </section>
    </main>
  );
}
