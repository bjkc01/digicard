"use client";

import type { ChangeEvent, ComponentType, ReactNode } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  AtSign,
  BriefcaseBusiness,
  Camera,
  Check,
  Globe,
  Mail,
  Phone,
  QrCode,
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
import { qrPreferenceOptions, type WorkspaceQrPreference } from "@/lib/workspace-settings-options";

export type CardFormValues = {
  company: string;
  email: string;
  linkedin: string;
  name: string;
  phone: string;
  qrPreference: WorkspaceQrPreference;
  title: string;
  website: string;
};

type FieldConfig = {
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  key: keyof CardFormValues;
  label: string;
  maxLength?: number;
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
  { key: "name", label: "Full name", placeholder: "Your name", icon: Sparkles, required: true, maxLength: 60 },
  {
    key: "title",
    label: "Professional title",
    placeholder: "Student, founder, designer…",
    icon: BriefcaseBusiness,
    required: true,
    maxLength: 80,
  },
  { key: "company", label: "School or company", placeholder: "University or company", icon: ShieldCheck, maxLength: 80 },
];

const contactFields: FieldConfig[] = [
  { key: "email", label: "Email", placeholder: "you@example.com", type: "email", icon: Mail, required: true, maxLength: 254 },
  { key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", icon: Phone, maxLength: 40 },
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "yourname or linkedin.com/in/yourname",
    hint: "DigiCard normalizes to linkedin.com/in/yourname.",
    icon: AtSign,
    maxLength: 200,
  },
  { key: "website", label: "Website", placeholder: "yourwebsite.com", icon: Globe, span: "full", maxLength: 120 },
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
    templates.find((t) => t.id === initialTemplateId) ?? templates[2]!;
  const [formData, setFormData] = useState<CardFormValues>(initialFormData);
  const [selectedTemplate, setSelectedTemplate] = useState<DigiCardTemplate>(initialTemplate);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [statusVisible, setStatusVisible] = useState(false);
  const [actionState, formAction] = useActionState(
    saveWorkspaceCardAction,
    initialSaveCardActionState,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedQrPreference =
    qrPreferenceOptions.find((o) => o.key === formData.qrPreference) ?? qrPreferenceOptions[0]!;

  useEffect(() => {
    if (actionState.status !== "idle") {
      setStatusVisible(true);
      const timer = setTimeout(() => setStatusVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionState]);

  const handleChange =
    (field: keyof CardFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageError(null);

    if (!file) {
      setImageError("No file selected. Please choose a PNG, JPG, or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be under 5 MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(typeof e.target?.result === "string" ? e.target.result : null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)]">
      {/* ── Form column ── */}
      <div className="order-2 xl:order-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#0E1318]">Your workspace card</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Fill in your details and pick a template. Everything updates live.</p>
        </div>

        {statusVisible && actionState.status !== "idle" ? (
          <div
            className={cn(
              "mb-6 rounded-2xl border px-5 py-4 text-sm font-medium animate-fade-in",
              getStatusTone(actionState),
            )}
          >
            {actionState.message}
          </div>
        ) : null}

        <form action={formAction} className="space-y-5">
          <input name="defaultTemplateId" type="hidden" value={selectedTemplate.id} />

          <PendingWrapper className="space-y-5">
            {/* Identity */}
            <div
              role="group"
              aria-labelledby="identity-section-label"
              className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5"
            >
              <p id="identity-section-label" className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                Identity
              </p>
              <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                {profileFields.map((field) => (
                  <Field
                    key={field.key}
                    icon={field.icon}
                    label={field.label}
                    maxLength={field.maxLength}
                    name={field.key}
                    onChange={handleChange(field.key)}
                    placeholder={field.placeholder}
                    required={field.required}
                    type={field.type}
                    value={formData[field.key]}
                  />
                ))}

                {/* QR destination */}
                <div className="sm:col-span-2 2xl:col-span-3">
                  <div
                    role="radiogroup"
                    aria-labelledby="qr-label"
                    className="rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <QrCode className="h-4 w-4 text-[#00C4CC]" />
                      <p id="qr-label" className="text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                        QR destination
                      </p>
                    </div>
                    <div className="grid gap-2 md:grid-cols-3">
                      {qrPreferenceOptions.map((option) => {
                        const isSelected = formData.qrPreference === option.key;
                        return (
                          <label
                            key={option.key}
                            className={cn(
                              "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-all duration-150",
                              isSelected
                                ? "border-[#00C4CC] bg-[#00C4CC]/5 ring-2 ring-[#00C4CC]/20"
                                : "border-gray-200 bg-[#F8F9F9] hover:border-[#00C4CC]/40 hover:bg-white",
                            )}
                          >
                            <input
                              aria-label={option.label}
                              checked={isSelected}
                              className="sr-only"
                              name="qrPreference"
                              onChange={handleChange("qrPreference")}
                              type="radio"
                              value={option.key}
                            />
                            <span className="text-sm font-medium text-[#0E1318]">{option.label}</span>
                            {isSelected ? <Check className="h-4 w-4 text-[#00C4CC]" /> : null}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact + Portrait */}
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div
                role="group"
                aria-labelledby="contact-section-label"
                className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5"
              >
                <p id="contact-section-label" className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                  Contact
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {contactFields.map((field) => (
                    <Field
                      key={field.key}
                      className={field.span === "full" ? "md:col-span-2" : undefined}
                      hint={field.hint}
                      icon={field.icon}
                      label={field.label}
                      maxLength={field.maxLength}
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
                <p id="portrait-label" className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                  Portrait
                </p>
                <button
                  type="button"
                  aria-label="Upload profile image"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex min-h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white px-4 text-center transition-all duration-150 hover:border-[#00C4CC] hover:bg-[#00C4CC]/5"
                >
                  {imagePreview ? (
                    <div className="animate-fade-in flex flex-col items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt="Profile preview"
                        className="h-16 w-16 rounded-2xl object-cover shadow-sm"
                        src={imagePreview}
                      />
                      <p className="text-xs text-[#293039]">Click to swap</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF0F2]">
                        <Camera className="h-5 w-5 text-[#293039]" />
                      </div>
                      <p className="text-xs text-[#293039]">PNG, JPG, WEBP · 5 MB max</p>
                    </div>
                  )}
                </button>
                {imageError ? (
                  <div className="animate-fade-in mt-3 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                    <p className="text-xs leading-5 text-red-700">{imageError}</p>
                  </div>
                ) : null}
                <input
                  ref={fileInputRef}
                  accept="image/png,image/jpeg,image/webp"
                  aria-labelledby="portrait-label"
                  className="hidden"
                  onChange={handleImageChange}
                  type="file"
                />
              </div>
            </div>

            {/* Visual direction */}
            <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                  Visual direction
                </p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#293039]">
                  <SwatchBook className="h-3.5 w-3.5" />
                  {selectedTemplate.name}
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
                {templates.map((template) => {
                  const isActive = template.id === selectedTemplate.id;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedTemplate(template)}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border p-3 text-left transition-all duration-150",
                        isActive
                          ? "border-[#00C4CC] bg-white shadow-sm ring-2 ring-[#00C4CC]/20"
                          : "border-gray-200 bg-white hover:border-[#00C4CC]/40 hover:shadow-sm",
                      )}
                    >
                      <div className={cn("h-20 rounded-lg bg-gradient-to-br p-[1px]", template.accent)}>
                        <div className="flex h-full flex-col justify-between rounded-[7px] bg-slate-950/90 p-3">
                          <span className="text-[9px] uppercase tracking-widest text-white/40">DigiCard</span>
                          <p className="text-sm font-bold text-white">{template.name}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-[#0E1318]">{template.name}</p>
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#00C4CC]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#00C4CC]">
                            <Check className="h-3 w-3" />
                            Active
                          </span>
                        ) : (
                          <span className="text-[11px] text-gray-400 transition-colors duration-150 group-hover:text-[#00C4CC]">
                            Select →
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </PendingWrapper>

          {/* Save */}
          <div className="flex justify-end">
            <CreateCardSubmitButton />
          </div>
        </form>
      </div>

      {/* ── Preview column ── */}
      <div className="relative order-1 xl:order-2">
        <div className="sticky top-6 rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5 shadow-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#00C4CC]">
            Live preview
          </p>
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <CardPreview
              card={{
                id: 99,
                color: selectedTemplate.accent,
                company: formData.company,
                email: formData.email,
                linkedin: formData.linkedin,
                name: formData.name || "Your name",
                phone: formData.phone,
                qrPreference: formData.qrPreference,
                template: selectedTemplate.name,
                title: formData.title || "Professional title",
                website: formData.website,
              }}
              imageUrl={imagePreview ?? undefined}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "Template", value: selectedTemplate.name },
              { label: "Links", value: String([formData.email, formData.phone, formData.linkedin, formData.website].filter(Boolean).length) },
              { label: "QR", value: selectedQrPreference.label },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">{item.label}</p>
                <p className="mt-1 text-xs font-semibold text-[#0E1318]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PendingWrapper({ className, children }: { className?: string; children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <div
      aria-disabled={pending}
      className={cn("transition-opacity duration-200", pending && "pointer-events-none opacity-60", className)}
    >
      {children}
    </div>
  );
}

function CreateCardSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#0F172A] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#111f3a] disabled:cursor-not-allowed disabled:scale-[0.98] disabled:opacity-50"
    >
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Saving…
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
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  maxLength?: number;
  name: keyof CardFormValues;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
};

function Field({
  className,
  hint,
  icon: Icon,
  label,
  maxLength,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: FieldProps) {
  const id = `field-${name}`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-xs font-semibold text-[#293039]">
        {label}
        {required ? <span className="ml-0.5 text-[#00C4CC]" aria-hidden="true">*</span> : null}
      </label>
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 transition-colors duration-150 group-focus-within:text-[#00C4CC]">
          <Icon className="h-4 w-4" />
        </div>
        <input
          id={id}
          aria-required={required}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-[#0E1318] placeholder:text-gray-400 outline-none transition-colors duration-150 focus:border-[#00C4CC] focus:ring-2 focus:ring-[#00C4CC]/20"
          maxLength={maxLength}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
      </div>
      {hint ? (
        <span id={`${id}-hint`} className="text-[11px] leading-5 text-[#5d6772]">{hint}</span>
      ) : null}
    </div>
  );
}
