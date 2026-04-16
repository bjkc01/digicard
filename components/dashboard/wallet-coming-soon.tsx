import { Wallet } from "lucide-react";

export function WalletComingSoon() {
  return (
    <div className="overflow-hidden rounded-[1.8rem] border border-[#e2e8f0] bg-white shadow-[0_20px_44px_rgba(15,23,42,0.06)]">
      <div className="border-b border-[#e2e8f0] px-5 py-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#64748b]">
            <Wallet className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#0E1318]">Add to Wallet</p>
              <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#94a3b8]">
                Coming soon
              </span>
            </div>
            <p className="mt-0.5 text-[13px] leading-5 text-[#475569]">
              Apple Wallet and Google Wallet support is on the way.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        <button
          type="button"
          disabled
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#e2e8f0] bg-[#f9fafb] px-4 py-4 opacity-50 shadow-[0_10px_26px_rgba(15,23,42,0.04)] disabled:cursor-not-allowed"
        >
          <svg className="h-7 w-7 shrink-0 text-[#111827]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <span className="whitespace-nowrap text-xs font-semibold text-[#111827]">Apple Wallet</span>
        </button>

        <button
          type="button"
          disabled
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#e2e8f0] bg-[#f9fafb] px-4 py-4 opacity-50 shadow-[0_10px_26px_rgba(15,23,42,0.04)] disabled:cursor-not-allowed"
        >
          <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="whitespace-nowrap text-xs font-semibold text-[#111827]">Google Wallet</span>
        </button>
      </div>
    </div>
  );
}
