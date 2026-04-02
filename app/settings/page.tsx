"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { templates, formDefaults } from "@/lib/data";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: formDefaults.name,
    email: formDefaults.email,
    role: "Admin",
  });

  const [defaultTemplate, setDefaultTemplate] = useState("blueprint");

  const [notifications, setNotifications] = useState({
    cardOpens: true,
    qrScans: true,
    newSaves: false,
    weeklyDigest: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated", { description: "Your changes have been saved." });
  };

  const handleTemplateChange = (id: string) => {
    setDefaultTemplate(id);
    const name = templates.find((t) => t.id === id)?.name ?? id;
    toast.success("Default template updated", { description: `New cards will use ${name}.` });
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      toast.info(
        next[key] ? "Notification enabled" : "Notification disabled",
        { description: notificationLabels[key] },
      );
      return next;
    });
  };

  const notificationLabels: Record<keyof typeof notifications, string> = {
    cardOpens: "Card opens",
    qrScans: "QR code scans",
    newSaves: "New contact saves",
    weeklyDigest: "Weekly digest email",
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/settings" />

      <section className="space-y-6">
        {/* Header */}
        <div className="panel p-6">
          <p className="eyebrow">Settings</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Account & preferences
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your profile, default template, and notification preferences.
          </p>
        </div>

        {/* Profile */}
        <div className="panel p-6">
          <h2 className="text-base font-semibold text-slate-900">Profile</h2>
          <p className="mt-1 text-sm text-slate-500">
            This information appears on your workspace and account.
          </p>

          <form onSubmit={handleProfileSave} className="mt-6 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Display name"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@company.com"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="h-10 w-10 rounded-full bg-slate-900" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
                <p className="text-xs text-slate-500">{profile.role}</p>
              </div>
              <button
                type="button"
                onClick={() => toast.info("Avatar upload coming soon")}
                className="ml-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Change avatar
              </button>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save profile</Button>
            </div>
          </form>
        </div>

        {/* Default template */}
        <div className="panel p-6">
          <h2 className="text-base font-semibold text-slate-900">Default template</h2>
          <p className="mt-1 text-sm text-slate-500">
            New cards will start with this template selected.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {templates.map((t) => {
              const isSelected = defaultTemplate === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTemplateChange(t.id)}
                  className={`rounded-[20px] border-2 p-3 text-left transition ${
                    isSelected
                      ? "border-slate-900 bg-slate-50"
                      : "border-transparent bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`h-20 rounded-2xl bg-gradient-to-br ${t.accent}`}
                  />
                  <div className="mt-3 flex items-center justify-between px-0.5">
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    {isSelected && (
                      <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                        Default
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="panel p-6">
          <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose which activity triggers a notification.
          </p>

          <div className="mt-6 space-y-3">
            {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4"
              >
                <p className="text-sm font-medium text-slate-700">{notificationLabels[key]}</p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications[key]}
                  onClick={() => toggleNotification(key)}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                    notifications[key] ? "bg-slate-900" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      notifications[key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="panel border-red-100 p-6">
          <h2 className="text-base font-semibold text-slate-900">Danger zone</h2>
          <p className="mt-1 text-sm text-slate-500">
            Irreversible actions for your account and workspace.
          </p>

          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-red-700">Delete account</p>
                <p className="mt-1 text-sm text-red-600">
                  Permanently remove your account and all cards.
                </p>
              </div>
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="shrink-0 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Delete account
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      toast.error("Account deleted", {
                        description: "Your account has been removed.",
                      });
                      setShowDeleteConfirm(false);
                    }}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
