"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { templates, formDefaults, DigiCardTemplate } from "@/lib/data";
import { CardPreview } from "@/components/digicard/card-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
};

export function CreateCardForm() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") ?? "blueprint";
  const initial = templates.find((t) => t.id === templateParam) ?? templates[2];

  const [formData, setFormData] = useState<FormData>(formDefaults);
  const [selectedTemplate, setSelectedTemplate] = useState<DigiCardTemplate>(initial);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
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
    toast.success("Card saved!", {
      description: "Your card is ready to share with a link or QR code.",
    });
  };

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        {/* ── Form panel ── */}
        <div className="panel p-6 md:p-8">
          <p className="eyebrow">Create card</p>
          <h1 className="section-title mt-4">Build a polished professional card</h1>
          <p className="section-copy mt-5">
            Add contact details, pick a template, and review the live preview before publishing.
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Name"
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="Your full name"
              />
              <Input
                label="Title"
                value={formData.title}
                onChange={handleChange("title")}
                placeholder="e.g. Product Manager"
              />
              <Input
                label="Company"
                value={formData.company}
                onChange={handleChange("company")}
                placeholder="Your company name"
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="you@company.com"
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={handleChange("phone")}
                placeholder="+1 (555) 000-0000"
              />
              <Input
                label="LinkedIn"
                value={formData.linkedin}
                onChange={handleChange("linkedin")}
                placeholder="linkedin.com/in/yourname"
              />
              <Input
                label="Website"
                value={formData.website}
                onChange={handleChange("website")}
                placeholder="yourwebsite.com"
                className="md:col-span-2"
              />
            </div>

            {/* Image upload */}
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Profile Image
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-32 w-full items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-slate-400 hover:bg-slate-100"
              >
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="h-20 w-20 rounded-full object-cover ring-4 ring-white shadow-md"
                    />
                    <p className="text-xs text-slate-500">Click to change</p>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                      <span className="text-xl text-slate-400">+</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">Upload profile image</p>
                    <p className="mt-1 text-sm text-slate-500">PNG, JPG up to 5MB</p>
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

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="relative">
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving…
                  </span>
                ) : (
                  "Save Card"
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowTemplatePicker(true)}
              >
                Change Template
              </Button>
            </div>
          </form>
        </div>

        {/* ── Live preview panel ── */}
        <div className="panel p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Live preview</p>
              <p className="text-sm text-slate-500">Updates as you type</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Draft
            </span>
          </div>
          <CardPreview
            card={{
              id: 99,
              ...formData,
              template: selectedTemplate.name,
              color: selectedTemplate.accent,
            }}
            imageUrl={imagePreview ?? undefined}
          />

          <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">
              Template:{" "}
              <span className="text-slate-800">{selectedTemplate.name}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Template picker modal ── */}
      {showTemplatePicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowTemplatePicker(false)}
        >
          <div className="panel max-h-[85vh] w-full max-w-3xl overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="eyebrow">Templates</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  Choose a template
                </h2>
              </div>
              <button
                onClick={() => setShowTemplatePicker(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {templates.map((t) => {
                const isSelected = t.id === selectedTemplate.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedTemplate(t);
                      setShowTemplatePicker(false);
                    }}
                    className={`group rounded-[24px] border-2 p-4 text-left transition ${
                      isSelected
                        ? "border-slate-900 bg-slate-50"
                        : "border-transparent bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`h-36 rounded-[20px] bg-gradient-to-br ${t.accent} p-4`}
                    >
                      <div className="flex h-full flex-col justify-between rounded-[16px] border border-white/15 bg-black/10 p-3 text-white">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                          DigiCard
                        </span>
                        <p className="text-sm font-semibold">{t.name}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between px-1">
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      {isSelected && (
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="mt-1 px-1 text-xs leading-5 text-slate-500">
                      {t.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
