"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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
import { toast } from "sonner";
import { templates, formDefaults, DigiCardTemplate } from "@/lib/data";
import { CardPreview } from "@/components/cards/card-preview";
import { cn } from "@/lib/utils";

type FormData = {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
};

type FieldConfig = {
  key: keyof FormData;
  label: string;
  placeholder: string;
  type?: string;
  icon: React.ComponentType<{ className?: string }>;
  span?: "full";
};

const profileFields: FieldConfig[] = [
  { key: "name", label: "Full name", placeholder: "Sofia Bennett", icon: Sparkles },
  { key: "title", label: "Role", placeholder: "Founder & Growth Advisor", icon: BriefcaseBusiness },
  { key: "company", label: "Company", placeholder: "DigiCard", icon: ShieldCheck },
];

const contactFields: FieldConfig[] = [
  { key: "email", label: "Email", placeholder: "you@company.com", type: "email", icon: Mail },
  { key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", icon: Phone },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourname", icon: AtSign },
  { key: "website", label: "Website", placeholder: "yourwebsite.com", icon: Globe, span: "full" },
];

export function CreateCardForm() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") ?? "blueprint";
  const initial = templates.find((t) => t.id === templateParam) ?? templates[2];

  const [formData, setFormData] = useState<FormData>(formDefaults);
  const [selectedTemplate, setSelectedTemplate] = useState<DigiCardTemplate>(initial);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large", { description: "Please upload an image under 5MB." });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name is required", { description: "Please enter a name for this card." });
      return;
    }
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSaving(false);
    toast.success("Card saved", {
      description: "Your card is polished, sharable, and ready to publish.",
    });
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">

      {/* ── Left: Form ── */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#00C4CC]/10 px-4 py-2 text-xs font-semibold text-[#00C4CC]">
              <Sparkles className="h-3.5 w-3.5" />
              Create Your Signature Card
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#0E1318] md:text-5xl">
              Build a card that feels premium at first glance.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#293039]">
              Refine the details, dial in the tone, and ship something that looks like a sharp brand presentation.
            </p>
          </div>

          <div className="grid min-w-[220px] gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {[
              { label: "Profile ready", value: "06", note: "Core touchpoints filled" },
              { label: "Share feel", value: "NFC", note: "Modern first impression" },
              { label: "Brand tone", value: "Live", note: selectedTemplate.name },
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

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

          {/* Identity section */}
          <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <p className="text-sm font-bold text-[#0E1318]">Identity</p>
                <p className="mt-0.5 text-sm text-[#293039]">Make the first line feel credible.</p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00C4CC]/10 px-3 py-1.5 text-xs font-semibold text-[#00C4CC]">
                <Check className="h-3.5 w-3.5" />
                Clean layout
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {profileFields.map((field) => (
                <Field
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={formData[field.key]}
                  onChange={handleChange(field.key)}
                  icon={field.icon}
                  type={field.type}
                />
              ))}
            </div>
          </div>

          {/* Contact + Portrait */}
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5">
              <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <p className="text-sm font-bold text-[#0E1318]">Contact</p>
                  <p className="mt-0.5 text-sm text-[#293039]">Keep every tap destination useful.</p>
                </div>
                <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#293039]">
                  Instant preview
                </span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {contactFields.map((field) => (
                  <Field
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={handleChange(field.key)}
                    icon={field.icon}
                    type={field.type}
                    className={field.span === "full" ? "md:col-span-2" : undefined}
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
                  <p className="text-xs text-[#293039]">Optional, but strong for recall.</p>
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
                      src={imagePreview}
                      alt="Profile preview"
                      className="h-20 w-20 rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#0E1318]">Portrait updated</p>
                      <p className="mt-0.5 text-xs text-[#293039]">Click to swap.</p>
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
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleImageChange}
                aria-label="Upload profile image"
              />
            </div>
          </div>

          {/* Template picker */}
          <div className="rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <p className="text-sm font-bold text-[#0E1318]">Visual direction</p>
                <p className="mt-0.5 text-sm text-[#293039]">Pick a template that feels professional.</p>
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
                          Active
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

          {/* Submit bar */}
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-[#F8F9F9] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#0E1318]">Ready to publish</p>
              <p className="mt-0.5 text-sm text-[#293039]">
                The live preview updates as you refine every detail.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#7D2AE8] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#6d22d0] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </>
              ) : (
                <>
                  Save card
                  <Check className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Right: Preview ── */}
      <div className="relative">
        <div className="sticky top-6 overflow-hidden rounded-2xl border border-gray-200 bg-[#F8F9F9] p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00C4CC]">
                Live preview
              </p>
              <h2 className="mt-1 text-lg font-bold text-[#0E1318]">Presentation preview</h2>
            </div>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#293039]">
              Updates instantly
            </span>
          </div>

          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-3">
            <CardPreview
              card={{
                id: 99,
                ...formData,
                template: selectedTemplate.name,
                color: selectedTemplate.accent,
              }}
              imageUrl={imagePreview ?? undefined}
            />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              { label: "Template", value: selectedTemplate.name },
              { label: "Contact points", value: "4 linked" },
              { label: "Card mood", value: "Premium" },
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
            <p className="text-sm font-bold text-[#0E1318]">Finish with confidence</p>
            <p className="mt-1 text-sm text-[#293039]">
              The card stays sharper, calmer, and more credible than anything paper.
            </p>
            <div className="mt-4 space-y-2.5">
              {[
                "Stronger contrast and spacing for a premium first impression.",
                "Integrated template choices so the flow feels deliberate.",
                "Live preview matches the page tone at all times.",
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

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  className?: string;
};

function Field({ label, placeholder, value, onChange, icon: Icon, type = "text", className }: FieldProps) {
  return (
    <label className={cn("group flex flex-col gap-1.5", className)}>
      <span className="text-xs font-semibold text-[#293039]">{label}</span>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 transition group-focus-within:text-[#00C4CC]">
          <Icon className="h-4 w-4" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-[#0E1318] placeholder:text-gray-400 outline-none transition focus:border-[#00C4CC] focus:ring-2 focus:ring-[#00C4CC]/20"
        />
      </div>
    </label>
  );
}
