import type { Metadata } from "next";

const siteUrl = "https://keyboardtester-yu25.vercel.app";

export const metadata: Metadata = {
  title: "Keyboard Tester FAQ - Frequently Asked Questions | Key Rollover Test Questions",
  description:
    "Frequently asked questions about keyboardtesterhub and key rollover test: how it works, privacy, anti-ghosting testing, N-key rollover, cross-platform support, and troubleshooting keyboard issues. Get answers to common questions about keyboard testing.",
  keywords: [
    "keyboard tester FAQ",
    "keyboard testing questions",
    "keyboard tester help",
    "keyboard diagnostic FAQ",
    "key rollover test FAQ",
    "keyboard tester questions",
    "keyboard test help",
    "key rollover test",
    "key rollover tester",
    "n-key rollover test",
    "anti-ghosting test",
  ],
  openGraph: {
    title: "Keyboard Tester FAQ - Frequently Asked Questions",
    description:
      "Get answers to common questions about keyboardtesterhub, how it works, and how to use it for diagnosing keyboard issues.",
    type: "website",
    url: `${siteUrl}/faq`,
  },
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};

const faqs = [
  {
    question: "What is a key rollover test?",
    answer:
      "A key rollover test checks how many keys your keyboard can register simultaneously. Our free key rollover test tool lets you test your keyboard's rollover capabilities instantly. Press multiple keys at once and see which ones register - this helps identify if your keyboard supports the key combinations you need for gaming or professional work.",
  },
  {
    question: "What is an N key rollover tester?",
    answer:
      "An N key rollover tester is a tool that checks if your keyboard supports full N-key rollover (NKRO), meaning it can register all keys pressed at the same time. Our free N key rollover tester online lets you test this instantly - press as many keys as possible simultaneously and see if they all register correctly.",
  },
  {
    question: "How does the key rollover tester work?",
    answer:
      "Our key rollover tester listens to keyboard events directly from your browser. When you press keys, we detect the events and highlight the matching keys on the visual layout. Press multiple keys simultaneously to test rollover capabilities. No installation or extra software is required.",
  },
  {
    question: "How do I perform a key rollover test?",
    answer:
      "To perform a key rollover test, simply press multiple keys simultaneously on your keyboard. Our key rollover test tool will show which keys register. Try pressing common gaming combinations like W+A+S+D+Space+Shift. If all keys light up, your keyboard passes the key rollover test. This is essential for gaming keyboards.",
  },
  {
    question: "Do you record what I type?",
    answer:
      "No. The tool only needs to know which key was pressed, not the full text you are typing. Key events are handled locally in your browser and are not sent to a server that we control.",
  },
  {
    question: "Can I test gaming keyboards and anti-ghosting?",
    answer:
      "Yes. Hold down multiple keys at once—such as WASD, Space, and Shift—and confirm that every key lights up in the visual layout. If some keys do not appear, your keyboard may not support that combination.",
  },
  {
    question: "Why doesn't a specific key light up?",
    answer:
      "First, make sure the browser tab is focused. If it is, and a key still does not light up, the issue is likely with the physical keyboard (for example, a faulty switch or a connection issue).",
  },
  {
    question: "Does it work on Mac, Windows, and Linux?",
    answer:
      "Yes. keyboardtesterhub runs in the browser and works across most modern operating systems: Windows, macOS, and popular Linux distributions.",
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://keyboardtester-yu25.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://keyboardtester-yu25.vercel.app/faq",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Short answers to the most common questions about using keyboardtesterhub.
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
          {faqs.map((item) => (
            <div key={item.question} className="border-b border-zinc-100 dark:border-zinc-700 pb-3 last:border-b-0 last:pb-0">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {item.question}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.answer}
              </p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
