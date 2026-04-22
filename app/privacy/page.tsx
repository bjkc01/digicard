import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-white/55 transition-colors hover:text-white">
          Back to DigiCard
        </Link>

        <div className="mt-8 rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
            Privacy
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-7 text-white/68 sm:text-base">
            <p>
              DigiCard stores the information you choose to add to your card, such as your
              name, headline, links, and contact details, so your profile can be displayed
              and shared.
            </p>
            <p>
              We may also collect basic account and usage information needed to keep the app
              secure, operate authentication, and improve reliability.
            </p>
            <p>
              DigiCard does not sell your personal information. Information may be shared
              with service providers only when needed to run the product.
            </p>
            <p>
              If you need help with your account or want to request deletion, contact{" "}
              <a href="mailto:hello@digicard.me" className="text-white transition-colors hover:text-[#8da0ff]">
                hello@digicard.me
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
