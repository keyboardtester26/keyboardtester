import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about keyboard tester prro for feedback, bug reports, or business inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Contact
        </h1>
        <p className="text-sm text-zinc-500">
          Have feedback, found a bug, or want to talk about keyboard tester prro?
          We&apos;d love to hear from you.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-600 shadow-sm sm:p-5">
        <p>
          For most questions, you can reach out by email. When you contact us,
          please include:
        </p>
        <ul className="list-inside list-disc space-y-1.5">
          <li>What device and operating system you&apos;re using.</li>
          <li>Which browser and version (for example, Chrome, Edge, Firefox).</li>
          <li>
            A short description of what you were doing and what went wrong, if
            you&apos;re reporting a bug.
          </li>
        </ul>
        <p className="mt-2 text-sm">
          Email:{" "}
          <span className="font-medium text-zinc-900">
            your-email@example.com
          </span>{" "}
          (replace this with your real contact address when deploying).
        </p>
      </section>

      <section className="space-y-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
        <h2 className="text-sm font-semibold text-zinc-900">
          Response time & support
        </h2>
        <p>
          keyboard tester prro is a free tool, so response times may vary. We try
          to review feedback regularly and use it to improve reliability,
          performance, and features.
        </p>
      </section>
    </div>
  );
}


