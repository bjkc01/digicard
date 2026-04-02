import { LivePreview } from "@/components/digicard/live-preview";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionBadge } from "@/components/ui/section-badge";
import { formDefaults } from "@/lib/data";

export default function CreateCardPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6 lg:py-6">
      <Sidebar activePath="/create-card" />

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel p-6 md:p-8">
          <SectionBadge>Create card</SectionBadge>
          <h1 className="section-title mt-6">Build a polished professional card</h1>
          <p className="section-copy mt-5">
            Add your contact details, upload a profile image, and preview the final
            business card before publishing.
          </p>

          <form className="mt-10 space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Name" defaultValue={formDefaults.name} />
              <Input label="Title" defaultValue={formDefaults.title} />
              <Input label="Company" defaultValue={formDefaults.company} />
              <Input label="Email" type="email" defaultValue={formDefaults.email} />
              <Input label="Phone" defaultValue={formDefaults.phone} />
              <Input label="LinkedIn" defaultValue={formDefaults.linkedin} />
              <Input label="Website" defaultValue={formDefaults.website} className="md:col-span-2" />
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Profile Image
              <div className="flex min-h-32 items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <div>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-soft">
                    <span className="text-xl text-slate-400">+</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">Upload profile image</p>
                  <p className="mt-1 text-sm text-slate-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit">Save Card</Button>
              <Button href="/templates" variant="secondary">
                Change Template
              </Button>
            </div>
          </form>
        </div>

        <LivePreview />
      </section>
    </main>
  );
}
