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
  const displayName = workspaceView.settings.profile.name || workspaceUser.name;
  const displayEmail = workspaceView.settings.profile.email || workspaceUser.email;
  const avatarUrl = workspaceView.settings.profile.avatarUrl;
  const { category } = await searchParams;

  const validCategories: TemplateCategory[] = ["corporate", "creative", "bold", "minimal"];
  const activeCategory = validCategories.includes(category as TemplateCategory)
    ? (category as TemplateCategory)
    : null;

  const visibleTemplates = activeCategory
    ? templates.filter((t) => t.category === activeCategory)
    : templates;

  return (
    <main className="mx-auto grid w-full max-w-7xl min-w-0 gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/templates" avatarUrl={avatarUrl} email={displayEmail} userName={displayName} />

      <section className="panel min-w-0 p-5 sm:p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h1 className="section-title">Pick a clean starting point</h1>
          </div>
          <Button
            href="/create-card"
            className="w-full whitespace-nowrap rounded-full bg-slate-900 px-5 py-3 text-white hover:bg-slate-800 sm:w-auto"
          >
            Edit workspace card
          </Button>
        </div>

        {/* Category filter */}
        <div className="mt-6 sm:mt-8">
          <Suspense
            fallback={
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {["All", "Corporate", "Creative", "Bold", "Minimal"].map((label) => (
                  <div key={label} className="h-10 w-24 shrink-0 animate-pulse rounded-full bg-slate-100" />
                ))}
              </div>
            }
          >
            <TemplatesFilter />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="mt-6 grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
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
