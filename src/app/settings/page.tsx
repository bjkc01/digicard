import { Sidebar } from "@/frontend/dashboard/sidebar";
import { SettingsShell } from "@/frontend/settings/settings-shell";
import { requireWorkspaceUser } from "@/backend/workspace/auth";
import { getWorkspaceView } from "@/backend/workspace/view";

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
