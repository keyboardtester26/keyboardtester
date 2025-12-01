import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyboard Blog | Guides, Reviews & Tips | keyboardtesterhub",
  description:
    "Expert keyboard guides covering mechanical keyboards, switch types, ergonomics, cleaning, and gaming. Learn how to choose, maintain, and test your keyboard.",
  keywords: [
    "keyboard guide",
    "mechanical keyboard blog",
    "keyboard reviews",
    "keyboard tips",
    "keyboard maintenance",
    "gaming keyboard guide",
    "keyboard switch comparison",
  ],
  openGraph: {
    title: "Keyboard Blog | keyboardtesterhub",
    description:
      "Expert guides on mechanical keyboards, switches, ergonomics, and more.",
    type: "website",
  },
};

const blogPosts = [
  {
    slug: "best-mechanical-keyboards-gaming-2025",
    category: "Gaming",
    title: "Best Mechanical Keyboards for Gaming in 2025",
    excerpt:
      "Discover the top mechanical keyboards for gaming. Expert reviews covering switch types, polling rates, build quality, and features that matter for competitive gaming.",
    date: "2025-01-15",
    readTime: "12 min",
  },
  {
    slug: "membrane-vs-mechanical-keyboards",
    category: "Comparison",
    title: "Membrane vs Mechanical Keyboards: Complete Guide",
    excerpt:
      "Detailed comparison of membrane and mechanical keyboards covering durability, typing feel, gaming performance, price, and which type suits your needs best.",
    date: "2025-01-10",
    readTime: "10 min",
  },
  {
    slug: "how-to-clean-keyboard",
    category: "Maintenance",
    title: "How to Clean Your Keyboard: Step-by-Step Guide",
    excerpt:
      "Learn how to properly clean your keyboard with our detailed guide. From daily maintenance to deep cleaning, keep your keyboard hygienic and functioning perfectly.",
    date: "2025-01-05",
    readTime: "8 min",
  },
  {
    slug: "keyboard-switch-guide",
    category: "Switches",
    title: "Keyboard Switch Guide: Cherry MX, Gateron & More",
    excerpt:
      "Complete guide to mechanical keyboard switches. Learn about Cherry MX, Gateron, Kailh, and other switch types. Understand linear, tactile, and clicky switches.",
    date: "2024-12-28",
    readTime: "15 min",
  },
  {
    slug: "ergonomic-keyboards-programmers",
    category: "Ergonomics",
    title: "Best Ergonomic Keyboards for Programmers",
    excerpt:
      "Find the perfect ergonomic keyboard for programming. Detailed guide covering split keyboards, ortholinear layouts, tenting, and features that prevent RSI.",
    date: "2024-12-20",
    readTime: "11 min",
  },
  {
    slug: "how-to-properly-test-a-keyboard",
    category: "Testing",
    title: "How to Properly Test a Keyboard Before You Trust It",
    excerpt:
      "A step‑by‑step checklist for testing a new or used keyboard, from stuck keys and ghosting to real‑world typing checks.",
    date: "2024-12-15",
    readTime: "7 min",
  },
];

const categoryColors: Record<string, string> = {
  Gaming: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Comparison: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Maintenance: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Switches: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Ergonomics: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Testing: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
          Keyboard Blog
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Expert guides on mechanical keyboards, switch types, ergonomics, maintenance, 
          and gaming. Learn how to choose, care for, and get the most from your keyboard.
        </p>
      </header>

      {/* Featured Post */}
      <section>
        <article className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900 p-6 shadow-sm transition hover:border-zinc-300 dark:hover:border-zinc-600 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${categoryColors[blogPosts[0].category]}`}>
              {blogPosts[0].category}
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">Featured</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            {blogPosts[0].title}
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            {blogPosts[0].excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <time dateTime={blogPosts[0].date}>
                {new Date(blogPosts[0].date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{blogPosts[0].readTime} read</span>
            </div>
            <a
              href={`/blog/${blogPosts[0].slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Read article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>
      </section>

      {/* All Posts Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          All Articles
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 p-5 shadow-sm transition hover:border-zinc-300 dark:hover:border-zinc-600"
            >
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${categoryColors[post.category]}`}>
                {post.category}
              </span>
              <h3 className="mt-3 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {post.readTime} read
                </span>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-xs font-medium text-zinc-900 dark:text-zinc-200 underline underline-offset-4 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-zinc-200 dark:border-zinc-700 pt-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Browse by Category
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(categoryColors).map((category) => (
            <span
              key={category}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${categoryColors[category]}`}
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-6 text-center">
        <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
          Ready to Test Your Keyboard?
        </h2>
        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
          Use our free online keyboard tester to check every key, test rollover, 
          and verify your keyboard is working perfectly.
        </p>
        <a
          href="/"
          className="mt-4 inline-flex rounded-full bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          Start Testing
        </a>
      </section>
    </div>
  );
}
