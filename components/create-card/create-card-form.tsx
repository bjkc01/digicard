"use client";

import type { ChangeEvent, ComponentType, ReactNode } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  AtSign,
  BriefcaseBusiness,
  Camera,
  Check,
  Download,
  Globe,
  Mail,
  Phone,
  QrCode,
  ShieldCheck,
  Sparkles,
  SwatchBook,
  Wallet,
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

function formatPhone(raw: string) {
  // Strip everything except digits and leading +
  const hasPlus = raw.startsWith("+");
  const digits = raw.replace(/\D/g, "");

  // International: +X XXXXXXXXXX (keep as-is beyond 11 digits)
  if (hasPlus || digits.length > 10) {
    const country = digits.slice(0, digits.length > 10 ? digits.length - 10 : 1);
    const local = digits.slice(digits.length > 10 ? digits.length - 10 : 1);
    const area = local.slice(0, 3);
    const mid = local.slice(3, 6);
    const last = local.slice(6, 10);
    let formatted = `+${country}`;
    if (area) formatted += ` (${area}`;
    if (area.length === 3) formatted += ")";
    if (mid) formatted += ` ${mid}`;
    if (last) formatted += `-${last}`;
    return formatted;
  }

  // US/Canada 10-digit: (XXX) XXX-XXXX
  const area = digits.slice(0, 3);
  const mid = digits.slice(3, 6);
  const last = digits.slice(6, 10);
  let formatted = "";
  if (area) formatted += `(${area}`;
  if (area.length === 3) formatted += ")";
  if (mid) formatted += ` ${mid}`;
  if (last) formatted += `-${last}`;
  return formatted;
}

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
  const imageStorageKey = `digicard-portrait-${initialFormData.email}`;
  const [imagePreview, setImagePreview] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(`digicard-portrait-${initialFormData.email}`) ?? null;
  });
  const [imageError, setImageError] = useState<string | null>(null);
  const [statusVisible, setStatusVisible] = useState(false);
  const [actionState, formAction] = useActionState(
    saveWorkspaceCardAction,
    initialSaveCardActionState,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
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
      const value = field === "phone" ? formatPhone(event.target.value) : event.target.value;
      setFormData((current) => ({ ...current, [field]: value }));
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
      const dataUrl = typeof e.target?.result === "string" ? e.target.result : null;
      setImagePreview(dataUrl);
      if (dataUrl) {
        try { localStorage.setItem(imageStorageKey, dataUrl); } catch { /* quota exceeded */ }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      await document.fonts.ready;
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `digicard-${(formData.name || "card").toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
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

            {/* Contact */}
            <div
              role="group"
              aria-labelledby="contact-section-label"
              className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5"
            >
              <p id="contact-section-label" className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                Contact
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {contactFields.map((field) => (
                  <Field
                    key={field.key}
                    className={field.span === "full" ? "sm:col-span-2" : undefined}
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

            {/* Portrait */}
            <div
              role="group"
              aria-labelledby="portrait-label"
              className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5"
            >
              <p id="portrait-label" className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#6b7280]">
                Portrait
              </p>
              <button
                type="button"
                aria-label="Upload profile image"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white px-4 text-center transition-all duration-150 hover:border-[#00C4CC] hover:bg-[#00C4CC]/5"
              >
                {imagePreview ? (
                  <div className="animate-fade-in flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Profile preview"
                      className="h-16 w-16 rounded-2xl object-cover shadow-sm"
                      src={imagePreview}
                    />
                    <p className="text-xs text-[#293039]">Click to swap</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#EDF0F2]">
                      <Camera className="h-5 w-5 text-[#293039]" />
                    </div>
                    <p className="text-xs text-[#293039]">PNG, JPG, WEBP · 5 MB max</p>
                  </div>
                )}
              </button>
              {imagePreview ? (
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    localStorage.removeItem(imageStorageKey);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="mt-2 text-[11px] text-[#9ca3af] underline underline-offset-2 hover:text-red-500 transition-colors"
                >
                  Remove photo
                </button>
              ) : null}
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
        <div className="sticky top-6 flex flex-col gap-3">
          {/* Card preview */}
          <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#00C4CC]">
              Live preview
            </p>
            <div ref={cardRef}>
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
          </div>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#0F172A] px-5 py-4 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDownloading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating image…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download card as image
              </>
            )}
          </button>

          {/* Wallet — coming soon */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-[#6b7280]" />
                  <p className="text-xs font-semibold text-[#0E1318]">Add to Wallet</p>
                </div>
                <span className="rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#16a34a]">
                  Coming soon
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#9ca3af]">Save your DigiCard directly to your phone wallet.</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              <button
                type="button"
                disabled
                className="flex items-center justify-center gap-2 px-4 py-3.5 opacity-40 cursor-not-allowed"
              >
                {/* Apple logo */}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-xs font-semibold text-[#0E1318]">Apple Wallet</span>
              </button>
              <button
                type="button"
                disabled
                className="flex items-center justify-center gap-2 px-4 py-3.5 opacity-40 cursor-not-allowed"
              >
                {/* Google Pay "G" */}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs font-semibold text-[#0E1318]">Google Wallet</span>
              </button>
            </div>
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
