import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-white/55 transition-colors hover:text-white">
          Back to DigiCard
        </Link>

        <div className="mt-8 rounded-[2rem] border border-white/8 bg-white/[0.03] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
            Terms
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Terms of Use
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-7 text-white/68 sm:text-base">
            <p>
              DigiCard is provided so users can create and share digital networking cards.
              You are responsible for the information, links, and files you choose to share.
            </p>
            <p>
              You agree not to use DigiCard for unlawful activity, impersonation, or content
              that violates the rights of others.
            </p>
            <p>
              We may update, suspend, or remove access to the service when needed to protect
              the app, its users, or our infrastructure.
            </p>
            <p>
              Questions about these terms can be sent to{" "}
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
