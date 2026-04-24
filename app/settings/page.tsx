import { Sidebar } from "@/components/dashboard/sidebar";
import { SettingsShell } from "@/components/settings/settings-shell";
import { requireWorkspaceUser } from "@/lib/workspace-auth";
import { getWorkspaceView } from "@/lib/workspace-view";

export default async function SettingsPage() {
  const workspaceUser = await requireWorkspaceUser("/settings");
  const workspaceView = await getWorkspaceView(workspaceUser);
  const displayName = workspaceView.settings.profile.name || workspaceUser.name;
  const displayEmail = workspaceView.settings.profile.email || workspaceUser.email;
  const avatarUrl = workspaceView.settings.profile.avatarUrl;

  return (
    <main className="workspace-shell">
      <Sidebar activePath="/settings" avatarUrl={avatarUrl} email={displayEmail} userName={displayName} />
      <SettingsShell user={workspaceUser} workspaceView={workspaceView} />
    </main>
  );
}
