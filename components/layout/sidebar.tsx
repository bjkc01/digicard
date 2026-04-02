import Link from "next/link";
import { navigationItems } from "@/lib/data";
import { cn } from "@/lib/utils";

type SidebarProps = {
  activePath: string;
};

export function Sidebar({ activePath }: SidebarProps) {
  return (
    <aside className="panel flex h-fit flex-col gap-8 p-6 lg:sticky lg:top-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
          DC
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">DigiCard</p>
          <p className="text-sm text-slate-500">Professional identity</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navigationItems.map((item) => {
          const isActive = activePath === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-3xl bg-slate-950 p-5 text-white">
        <p className="text-sm font-semibold">Share smarter</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Update one card and keep every QR share link current everywhere.
        </p>
      </div>
    </aside>
  );
}
