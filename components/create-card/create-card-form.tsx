"use client";

import type { ChangeEvent, ComponentType } from "react";
import { useActionState, useRef, useState } from "react";
import {
  AtSign,
  BriefcaseBusiness,
  Camera,
  Check,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  SwatchBook,
} from "lucide-react";
import { useFormStatus } from "react-dom";
import {
  initialSaveCardActionState,
  type SaveCardActionState,
} from "@/app/create-card/action-state";
import {
  saveWorkspaceCardAction,
} from "@/app/create-card/actions";
import { CardPreview } from "@/components/cards/card-preview";
import type { DigiCardTemplate } from "@/lib/data";
import { templates } from "@/lib/data";
import { cn } from "@/lib/utils";

export type CardFormValues = {
  company: string;
  email: string;
  linkedin: string;
  name: string;
  phone: string;
  title: string;
  website: string;
};

type FieldConfig = {
  icon: ComponentType<{ className?: string }>;
  key: keyof CardFormValues;
  label: string;
  placeholder: string;
  required?: boolean;
  span?: "full";
  type?: string;
};

type CreateCardFormProps = {
  initialFormData: CardFormValues;
  initialTemplateId: string;
};

const profileFields: FieldConfig[] = [
  { key: "name", label: "Full name", placeholder: "Your name", icon: Sparkles, required: true },
  {
    key: "title",
    label: "Professional title",
    placeholder: "Student, founder, designer, or advisor",
    icon: BriefcaseBusiness,
    required: true,
  },
  { key: "company", label: "School or company", placeholder: "University or company", icon: ShieldCheck },
];

const contactFields: FieldConfig[] = [
  { key: "email", label: "Email", placeholder: "you@example.com", type: "email", icon: Mail, required: true },
  { key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", icon: Phone },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourname", icon: AtSign },
  { key: "website", label: "Website", placeholder: "yourwebsite.com", icon: Globe, span: "full" },
];

function getStatusTone(state: SaveCardActionState) {
  if (state.status === "success") {
    return "border-[rgba(16,185,129,0.16)] bg-[rgba(236,253,245,0.92)] text-[#065f46]";
  }

  if (state.status === "error") {
    return "border-[rgba(239,68,68,0.16)] bg-[rgba(254,242,242,0.95)] text-[#991b1b]";
  }

  return "";
}

export function CreateCardForm({
  initialFormData,
  initialTemplateId,
}: CreateCardFormProps) {
  const initialTemplate =
    templates.find((template) => template.id === initialTemplateId) ?? templates[2]!;
  const [formData, setFormData] = useState<CardFormValues>(initialFormData);
  const [selectedTemplate, setSelectedTemplate] = useState<DigiCardTemplate>(initialTemplate);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [actionState, formAction] = useActionState(
    saveWorkspaceCardAction,
    initialSaveCardActionState,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filledIdentityCount = [formData.name, formData.title, formData.company].filter(Boolean).length;
  const contactPointCount = [
    formData.email,
    formData.phone,
    formData.linkedin,
    formData.website,
  ].filter(Boolean).length;

  const handleChange =
    (field: keyof CardFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setImagePreview(typeof loadEvent.target?.result === "string" ? loadEvent.target.result : null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#00C4CC]/10 px-4 py-2 text-xs font-semibold text-[#00C4CC]">
              <Sparkles className="h-3.5 w-3.5" />
              Card Builder
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#0E1318] md:text-5xl">
              Build the card your workspace will actually use.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#293039]">
              Save one polished identity, keep your default template aligned, and make sure
              Dashboard, My Card, and Settings all stay in sync.
            </p>
          </div>

          <div className="grid min-w-[220px] gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {[
              {
                label: "Identity",
                value: `${filledIdentityCount}/3`,
                note: "Core profile details ready",
              },
              {
                label: "Contact",
                value: `${contactPointCount}/4`,
                note: "Reachable links saved",
              },
              {
                label: "Template",
                value: selectedTemplate.name,
                note: "Current default direction",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-gray-100 bg-[#F8F9F9] px-4 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#293039]">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-bold text-[#0E1318]">{item.value}</p>
                <p className="mt-0.5 text-xs text-[#293039]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {actionState.status !== "idle" ? (
          <div className={cn("mt-6 rounded-2xl border px-5 py-4 text-sm font-medium", getStatusTone(actionState))}>
            {actionState.message}
          </div>
        ) : null}

        <form action={formAction} className="mt-8 space-y-5">
          <input name="defaultTemplateId" type="hidden" value={selectedTemplate.id} />

          <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <p className="text-sm font-bold text-[#0E1318]">Identity</p>
                <p className="mt-0.5 text-sm text-[#293039]">
                  This is the profile card the rest of the workspace reads from.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00C4CC]/10 px-3 py-1.5 text-xs font-semibold text-[#00C4CC]">
                <Check className="h-3.5 w-3.5" />
                Authenticated save
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {profileFields.map((field) => (
                <Field
                  key={field.key}
                  icon={field.icon}
                  label={field.label}
                  name={field.key}
                  onChange={handleChange(field.key)}
                  placeholder={field.placeholder}
                  required={field.required}
                  type={field.type}
                  value={formData[field.key]}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5">
              <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <p className="text-sm font-bold text-[#0E1318]">Contact</p>
                  <p className="mt-0.5 text-sm text-[#293039]">
                    Keep every tap destination useful and current.
                  </p>
                </div>
                <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#293039]">
                  Live preview
                </span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {contactFields.map((field) => (
                  <Field
                    key={field.key}
                    className={field.span === "full" ? "md:col-span-2" : undefined}
                    icon={field.icon}
                    label={field.label}
                    name={field.key}
                    onChange={handleChange(field.key)}
                    placeholder={field.placeholder}
                    required={field.required}
                    type={field.type}
                    value={formData[field.key]}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C4CC]/10">
                  <Camera className="h-4 w-4 text-[#00C4CC]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0E1318]">Portrait</p>
                  <p className="text-xs text-[#293039]">
                    Preview-only for now until image storage is added.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 flex min-h-52 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white px-5 text-center transition hover:border-[#00C4CC] hover:bg-[#00C4CC]/5"
              >
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Profile preview"
                      className="h-20 w-20 rounded-2xl object-cover shadow-sm"
                      src={imagePreview}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#0E1318]">Portrait updated</p>
                      <p className="mt-0.5 text-xs text-[#293039]">Click to swap the preview image.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF0F2]">
                      <Camera className="h-5 w-5 text-[#293039]" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#0E1318]">Add a profile image</p>
                    <p className="mt-1 text-xs text-[#293039]">PNG, JPG, or WEBP up to 5MB</p>
                  </div>
                )}
              </button>

              <input
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/webp"
                aria-label="Upload profile image"
                className="hidden"
                onChange={handleImageChange}
                type="file"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <p className="text-sm font-bold text-[#0E1318]">Visual direction</p>
                <p className="mt-0.5 text-sm text-[#293039]">
                  Pick the default template the workspace should reuse.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#293039]">
                <SwatchBook className="h-3.5 w-3.5" />
                {selectedTemplate.name}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
              {templates.map((template) => {
                const isActive = template.id === selectedTemplate.id;

                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template)}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border p-4 text-left transition",
                      isActive
                        ? "border-[#00C4CC] bg-white shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300",
                    )}
                  >
                    <div className={cn("h-24 rounded-lg bg-gradient-to-br p-[1px]", template.accent)}>
                      <div className="flex h-full flex-col justify-between rounded-[7px] bg-slate-950/90 p-3">
                        <span className="text-[9px] uppercase tracking-widest text-white/40">DigiCard</span>
                        <div>
                          <p className="text-sm font-bold text-white">{template.name}</p>
                          <p className="mt-0.5 text-[10px] text-white/40">{template.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-[#0E1318]">{template.name}</p>
                        <p className="mt-0.5 text-xs text-[#293039]">{template.id}</p>
                      </div>
                      {isActive ? (
                        <span className="rounded-full bg-[#00C4CC]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#00C4CC]">
                          Selected
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 transition group-hover:text-[#293039]">
                          Select
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-[#F8F9F9] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#0E1318]">Save to your workspace</p>
              <p className="mt-0.5 text-sm text-[#293039]">
                Dashboard, My Card, Settings, and the default template will update from this save.
              </p>
            </div>

            <CreateCardSubmitButton />
          </div>
        </form>
      </div>

      <div className="relative">
        <div className="sticky top-6 overflow-hidden rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00C4CC]">
                Live preview
              </p>
              <h2 className="mt-1 text-lg font-bold text-[#0E1318]">Workspace card preview</h2>
            </div>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#293039]">
              Updates instantly
            </span>
          </div>

          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-3">
            <CardPreview
              card={{
                id: 99,
                color: selectedTemplate.accent,
                company: formData.company,
                email: formData.email,
                linkedin: formData.linkedin,
                name: formData.name || "Your name",
                phone: formData.phone,
                template: selectedTemplate.name,
                title: formData.title || "Professional title",
                website: formData.website,
              }}
              imageUrl={imagePreview ?? undefined}
            />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              { label: "Template", value: selectedTemplate.name },
              { label: "Contact points", value: `${contactPointCount}` },
              { label: "Save model", value: "Validated" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-gray-100 bg-white px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#293039]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[#0E1318]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4">
            <p className="text-sm font-bold text-[#0E1318]">What this updates</p>
            <div className="mt-4 space-y-2.5">
              {[
                "The saved workspace card on Dashboard and My Card.",
                "The profile fields shown inside Settings.",
                "The default template used for the next card iteration.",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2.5 rounded-lg bg-[#F8F9F9] px-3 py-2.5">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00C4CC]/10">
                    <Check className="h-3 w-3 text-[#00C4CC]" />
                  </div>
                  <p className="text-xs leading-5 text-[#293039]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreateCardSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-[#0F172A] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#111f3a] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Saving card
        </>
      ) : (
        <>
          Save workspace card
          <Check className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

type FieldProps = {
  className?: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  name: keyof CardFormValues;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
};

function Field({
  className,
  icon: Icon,
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: FieldProps) {
  return (
    <label className={cn("group flex flex-col gap-1.5", className)}>
      <span className="text-xs font-semibold text-[#293039]">{label}</span>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 transition group-focus-within:text-[#00C4CC]">
          <Icon className="h-4 w-4" />
        </div>
        <input
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-[#0E1318] placeholder:text-gray-400 outline-none transition focus:border-[#00C4CC] focus:ring-2 focus:ring-[#00C4CC]/20"
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
      </div>
    </label>
  );
}
