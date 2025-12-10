import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About keyboardtesterhub - Free Online Keyboard Testing Tool",
  description:
    "Learn about keyboardtesterhub, a free browser-based keyboard testing tool. Test key rollover, anti-ghosting, response time, and verify every key works without installing software.",
  keywords: [
    "keyboard tester about",
    "keyboard testing tool",
    "online keyboard diagnostic",
    "key rollover tester",
    "gaming keyboard tester",
    "mechanical keyboard test",
    "keyboard test online",
    "free keyboard tester",
  ],
  openGraph: {
    title: "About keyboardtesterhub - Free Online Keyboard Testing Tool",
    description:
      "Learn about keyboardtesterhub, a free browser-based keyboard testing tool for diagnosing keyboard problems.",
    type: "website",
  },
  alternates: {
    canonical: "https://keyboardtester-yu25.vercel.app/about",
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
        item: "https://keyboardtester-yu25.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://keyboardtester-yu25.vercel.app/about",
      },
    ],
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "keyboardtesterhub",
    url: "https://keyboardtester-yu25.vercel.app",
    description: "Free online keyboard testing tool for gamers, developers, and keyboard enthusiasts.",
    foundingDate: "2024",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            About keyboardtesterhub
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            The free, professional keyboard testing tool trusted by gamers, developers, 
            and keyboard enthusiasts worldwide.
          </p>
        </header>

        {/* Mission Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Our Mission
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            We believe everyone deserves to know their keyboard works perfectly—whether you&apos;re 
            a competitive gamer counting on split-second reactions, a programmer typing thousands 
            of lines daily, or someone who just bought a new keyboard and wants peace of mind.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            keyboardtesterhub provides comprehensive, professional-grade keyboard diagnostics 
            completely free, directly in your browser, with no downloads or installations required.
          </p>
        </section>

        {/* Features Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            What You Can Test
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Key Registration
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Verify every single key on your keyboard registers properly. Visual feedback 
                shows pressed and tested keys in real-time.
              </p>
            </div>
            
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                N-Key Rollover
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Test how many keys your keyboard can register simultaneously. Essential for 
                gamers and power users who need multiple key inputs.
              </p>
            </div>
            
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Anti-Ghosting
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Check for ghosting issues where pressing certain key combinations causes 
                phantom inputs or missed keypresses.
              </p>
            </div>
            
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Response Time
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Measure keyboard response latency with our gaming test mode. Lower latency 
                means faster in-game reactions.
              </p>
            </div>
            
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Gaming Combos
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Test common gaming key combinations like WASD + Shift + Space to ensure 
                your keyboard handles complex inputs.
              </p>
            </div>
            
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Mouse Testing
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Also test your mouse buttons and scroll wheel. Complete input device 
                verification in one tool.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            How It Works
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            keyboardtesterhub uses your browser&apos;s native keyboard event APIs to detect and 
            visualize keypresses in real-time. When you press a key, your browser tells our 
            application which key was pressed, and we display it on the virtual keyboard.
          </p>
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5">
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
              Privacy First
            </h3>
            <p className="text-emerald-700 dark:text-emerald-400 text-sm">
              Everything happens locally in your browser. We don&apos;t record your keystrokes, 
              send data to servers, or store any information about what you type. The tool 
              only detects which keys are pressed—not what you&apos;re typing.
            </p>
          </div>
        </section>

        {/* Who It's For */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Who Uses keyboardtesterhub
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                🎮
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Gamers</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Competitive and casual gamers who need to verify their keyboard can handle 
                  complex inputs without ghosting or missed keypresses.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                💻
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Developers & Writers</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Professionals who type extensively and need every key working perfectly for 
                  maximum productivity.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                ⌨️
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Keyboard Enthusiasts</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Mechanical keyboard collectors and modders who test keyboards after switch 
                  swaps, builds, or modifications.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                🛒
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Second-Hand Buyers</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  People buying used keyboards who want to verify functionality before 
                  completing a purchase.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                🔧
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">IT Professionals</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Help desk and IT support staff who need to quickly diagnose keyboard issues 
                  on any computer without installing software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Built With Modern Technology
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            keyboardtesterhub is built with Next.js and React, ensuring fast load times and 
            smooth performance. The application works on all modern browsers including Chrome, 
            Firefox, Safari, and Edge, on both desktop and mobile devices.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            We support multiple keyboard layouts including ANSI (US), ISO (European), and 
            accommodate both Windows and Mac key labeling. The tool detects your operating 
            system and adjusts key labels accordingly.
          </p>
        </section>

        {/* Support Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Free Forever
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            keyboardtesterhub is and will always be completely free to use. We believe 
            essential diagnostic tools should be accessible to everyone. No accounts, no 
            subscriptions, no hidden costs.
          </p>
        </section>

        {/* Contact CTA */}
        <section className="rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Questions or Suggestions?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
            We&apos;re always looking to improve. If you have feature requests, bug reports, 
            or just want to say hello, we&apos;d love to hear from you.
          </p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="rounded-full bg-zinc-900 dark:bg-zinc-100 px-5 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/faq"
              className="rounded-full border border-zinc-300 dark:border-zinc-600 px-5 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Read FAQ
            </a>
          </div>
        </section>

        {/* Test CTA */}
        <section className="text-center py-8">
          <a
            href="/"
            className="inline-flex rounded-full bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            Start Testing Your Keyboard
          </a>
        </section>
      </div>
    </>
  );
}
