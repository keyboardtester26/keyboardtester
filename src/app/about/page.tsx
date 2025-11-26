import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About keyboardtesterpro - Free Online Keyboard Testing Tool",
  description:
    "Learn about keyboardtesterpro, a free browser-based keyboard testing tool. Discover how to diagnose keyboard problems, test anti-ghosting, and verify keyboard functionality without installing software.",
  keywords: [
    "keyboard tester about",
    "keyboard testing tool",
    "online keyboard diagnostic",
    "keyboard tester information",
  ],
  openGraph: {
    title: "About keyboardtesterpro - Free Online Keyboard Testing Tool",
    description:
      "Learn about keyboardtesterpro, a free browser-based keyboard testing tool for diagnosing keyboard problems.",
    type: "website",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://keyboardtesterpro.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://keyboardtesterpro.com/about",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            About keyboardtesterpro
          </h1>
          <p className="text-sm text-zinc-500">
            A minimal, focused tool for testing every key on your keyboard.
          </p>
        </header>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
          <h2 className="text-base font-semibold text-zinc-900">
            Why this tool exists
          </h2>
          <p>
            keyboardtesterpro was created to solve a simple problem: quickly
            confirm whether a keyboard is working properly without installing any
            software. It runs entirely in your browser and supports laptop
            keyboards, desktop keyboards, and gaming keyboards.
          </p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
          <h2 className="text-base font-semibold text-zinc-900">
            What you can do with it
          </h2>
          <ul className="list-inside list-disc space-y-1.5">
            <li>Check if every key on your keyboard registers correctly.</li>
            <li>Spot stuck or repeating keys that might need cleaning.</li>
            <li>
              Test common gaming key combinations and anti‑ghosting behavior.
            </li>
            <li>
              Verify a used or newly purchased keyboard before committing to it.
            </li>
          </ul>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
          <h2 className="text-base font-semibold text-zinc-900">
            How it works
          </h2>
          <p>
            The tester listens to keyboard events from your browser and visualizes
            them as you type. It does not need to know what you are typing—only
            which keys are being pressed—so it can run without logging your input
            to a server.
          </p>
        </section>

        <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
          <h2 className="text-base font-semibold text-zinc-900">
            Feedback & improvements
          </h2>
          <p>
            If you have suggestions for improving keyboardtesterpro—such as
            adding more layouts, languages, or testing modes—feel free to reach
            out through the{" "}
            <a href="/contact" className="font-medium text-zinc-900 underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
