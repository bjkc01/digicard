import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { TemplateTile } from "@/components/cards/template-tile";
import { templates } from "@/lib/data";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";

export default async function TemplatesPage() {
  const workspaceUser = await requireWorkspaceUser("/templates");
  const workspaceView = await getWorkspaceView(workspaceUser);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar
        activePath="/templates"
        statusCopy={workspaceView.summary.sidebarStatusCopy}
        userLabel={workspaceUser.name}
        userSubcopy={workspaceUser.email}
      />

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

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <TemplateTile
              key={template.id}
              isSelected={template.id === workspaceView.settings.defaultTemplateId}
              template={template}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
