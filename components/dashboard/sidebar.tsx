import Link from "next/link";
import { navigationItems } from "@/lib/data";
import { cn } from "@/lib/utils";

type SidebarProps = {
  activePath: string;
};

export function Sidebar({ activePath }: SidebarProps) {
  return (
    <aside className="panel flex h-fit flex-col gap-8 p-6 lg:sticky lg:top-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
          DC
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900">DigiCard</p>
          <p className="text-sm text-slate-500">Card management</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navigationItems.map((item) => {
          // "My Cards" shares href with Dashboard — only highlight Dashboard for /dashboard
          const isActive =
            item.label === "My Cards"
              ? false
              : activePath === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-900">Workspace status</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          3 published cards and 214 profile views in the last 7 days.
        </p>
      </div>
    </aside>
  );
}
