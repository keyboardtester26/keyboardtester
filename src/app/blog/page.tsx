import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "keyboard tester prro blog – guides on testing keyboards and mice, diagnosing issues, and getting the most from your hardware.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Blog
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Short, practical guides on testing and troubleshooting your keyboard
          and mouse.
        </p>
      </header>

      <section className="space-y-3">
        <article className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm transition hover:border-zinc-300 dark:hover:border-zinc-600 sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
            Keyboard testing guide
          </p>
          <h2 className="mt-1 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-lg">
            How to Properly Test a Keyboard Before You Trust It
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            A step‑by‑step checklist for testing a new or used keyboard, from
            stuck keys and ghosting to real‑world typing checks.
          </p>
          <a
            href="/blog/how-to-properly-test-a-keyboard"
            className="mt-3 inline-flex text-xs font-medium text-zinc-900 dark:text-zinc-200 underline underline-offset-4 sm:text-sm"
          >
            Read the full guide
          </a>
        </article>
      </section>
    </div>
  );
}


