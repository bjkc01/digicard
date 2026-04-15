import { Sidebar } from "@/components/dashboard/sidebar";
import { SettingsShell } from "@/components/settings/settings-shell";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";

export default async function SettingsPage() {
  const workspaceUser = await requireWorkspaceUser("/settings");
  const workspaceView = await getWorkspaceView(workspaceUser);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/settings" email={workspaceUser.email} userName={workspaceUser.name} />
      <SettingsShell user={workspaceUser} workspaceView={workspaceView} />
    </main>
  );
}
