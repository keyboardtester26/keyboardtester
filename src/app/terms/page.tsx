import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for keyboardtesterhub. Understand the rules for using this free online keyboard testing tool.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Terms of Use
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        By accessing or using keyboardtesterhub, you agree to the following
        terms. If you do not agree with these terms, please do not use this
        website.
      </p>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          1. No warranty
        </h2>
        <p>
          keyboardtesterhub is provided on an{" "}
          <span className="font-medium">&quot;as is&quot;</span> and{" "}
          <span className="font-medium">&quot;as available&quot;</span> basis.
          We do not make any guarantees about accuracy, availability, or
          suitability for any particular purpose.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          2. Acceptable use
        </h2>
        <p>
          You agree not to misuse keyboardtesterhub, including but not
          limited to: attempting to interfere with the operation of the site,
          reverse engineering, or using automated tools to scrape or overload
          our infrastructure.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          3. Third‑party links and ads
        </h2>
        <p>
          The site may display advertisements or links to third‑party websites.
          We are not responsible for the content, products, or services offered
          by third parties, and you access them at your own risk.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          4. Limitation of liability
        </h2>
        <p>
          To the maximum extent permitted by law, keyboardtesterhub and its
          owners are not liable for any indirect, incidental, or consequential
          damages arising from your use of the site, including data loss,
          hardware issues, or loss of profits.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          5. Changes to these terms
        </h2>
        <p>
          We may update these terms from time to time. Your continued use of
          keyboardtesterhub after changes are published will mean you accept
          the updated terms.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          6. Contact
        </h2>
        <p>
          If you have questions about these terms, please reach out through the
          contact information provided on the site where keyboardtesterhub is
          hosted.
        </p>
      </section>
    </div>
  );
}


