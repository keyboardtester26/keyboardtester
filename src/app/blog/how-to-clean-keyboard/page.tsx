import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Clean Your Keyboard: Complete Step-by-Step Guide",
  description:
    "Learn how to properly clean your keyboard with our detailed guide. From daily maintenance to deep cleaning, keep your keyboard hygienic and functioning perfectly.",
  keywords: [
    "how to clean keyboard",
    "keyboard cleaning guide",
    "clean mechanical keyboard",
    "keyboard maintenance",
    "remove keyboard grime",
    "disinfect keyboard",
    "keyboard hygiene",
  ],
  openGraph: {
    title: "How to Clean Your Keyboard: Complete Guide",
    description:
      "Step-by-step instructions for cleaning any type of keyboard safely and effectively.",
    type: "article",
    publishedTime: "2025-01-05T00:00:00.000Z",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Clean Your Keyboard",
  description: "Complete guide to cleaning your keyboard safely and effectively.",
  step: [
    {
      "@type": "HowToStep",
      name: "Unplug and Prepare",
      text: "Disconnect your keyboard and gather cleaning supplies.",
    },
    {
      "@type": "HowToStep",
      name: "Remove Loose Debris",
      text: "Turn keyboard upside down and shake out loose particles.",
    },
    {
      "@type": "HowToStep",
      name: "Remove Keycaps",
      text: "Use a keycap puller to remove keycaps for deep cleaning.",
    },
    {
      "@type": "HowToStep",
      name: "Clean the Surface",
      text: "Use compressed air and cleaning solution to clean all surfaces.",
    },
    {
      "@type": "HowToStep",
      name: "Reassemble",
      text: "Let everything dry completely before reassembling.",
    },
  ],
  tool: [
    "Keycap puller",
    "Compressed air",
    "Isopropyl alcohol",
    "Microfiber cloth",
    "Soft brush",
  ],
};

export default function HowToCleanKeyboardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <a href="/blog" className="hover:text-zinc-700 dark:hover:text-zinc-300">
              Blog
            </a>
            <span>/</span>
            <span>Maintenance</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            How to Clean Your Keyboard: Complete Step-by-Step Guide
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Your keyboard collects dust, crumbs, oils, and bacteria every day. Regular cleaning 
            maintains performance, extends lifespan, and keeps your workspace hygienic.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime="2025-01-05">January 5, 2025</time>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Why Keyboard Cleaning Matters
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Studies have shown keyboards can harbor more bacteria than toilet seats. Beyond hygiene 
              concerns, accumulated debris affects key responsiveness, causes sticky keys, and can 
              eventually damage switch mechanisms. A clean keyboard types better, lasts longer, and 
              creates a more pleasant working environment.
            </p>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5">
              <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
                ⚠️ Always unplug your keyboard before cleaning. For wireless keyboards, turn them 
                off and remove batteries if possible.
              </p>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              What You&apos;ll Need
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Essential Tools
                </h3>
                <ul className="text-zinc-700 dark:text-zinc-300 text-sm space-y-2">
                  <li>• Compressed air can or electric air duster</li>
                  <li>• Microfiber cloths (lint-free)</li>
                  <li>• Isopropyl alcohol (70% or higher)</li>
                  <li>• Cotton swabs</li>
                  <li>• Small soft brush</li>
                </ul>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  For Deep Cleaning
                </h3>
                <ul className="text-zinc-700 dark:text-zinc-300 text-sm space-y-2">
                  <li>• Keycap puller (wire or plastic)</li>
                  <li>• Bowl for soaking keycaps</li>
                  <li>• Mild dish soap</li>
                  <li>• Denture cleaning tablets (optional)</li>
                  <li>• Towel for drying</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Quick Daily/Weekly Maintenance
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Regular light cleaning prevents buildup and reduces the need for deep cleaning sessions.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Shake Out Debris</h4>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm mt-1">
                    Turn your keyboard upside down over a trash can and gently shake. Tap the back 
                    to dislodge particles trapped between keys.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Blow Out Dust</h4>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm mt-1">
                    Use compressed air in short bursts at an angle to blow out dust and debris. 
                    Work systematically across the keyboard.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Wipe Surfaces</h4>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm mt-1">
                    Dampen a microfiber cloth with isopropyl alcohol and wipe down keycaps and the 
                    keyboard frame. Don&apos;t let liquid drip into the keyboard.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Deep Cleaning (Monthly/Quarterly)
            </h2>
            
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Step 1: Document Your Layout
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Before removing keycaps, take a photo of your keyboard layout. This is especially 
                  important for non-standard layouts or if you use custom keycaps. It ensures you 
                  can reassemble everything correctly.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Step 2: Remove Keycaps
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-3">
                  Use a keycap puller to carefully remove each keycap. For mechanical keyboards, 
                  most keycaps pull straight up. Work gently—applying too much force can damage 
                  switches or keycap stems.
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <strong>Tip:</strong> Start with easier keys (letters and numbers) before attempting 
                  larger keys like Spacebar, Enter, and Shift, which may have stabilizers.
                </div>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Step 3: Clean Keycaps
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-3">
                  Place keycaps in a bowl of warm water with a small amount of dish soap. Let them 
                  soak for 30-60 minutes. For heavily soiled caps, add a denture cleaning tablet.
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  After soaking, gently scrub each keycap with a soft brush, rinse thoroughly with 
                  clean water, and lay them out on a towel to dry completely (at least 4-6 hours, 
                  preferably overnight).
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Step 4: Clean the Keyboard Base
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-3">
                  With keycaps removed, you can access the plate and switches. Use compressed air 
                  to blow out debris. Carefully use cotton swabs dampened with isopropyl alcohol to 
                  clean around switches and hard-to-reach areas.
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-300">
                  <strong>Warning:</strong> Never pour liquid directly onto the keyboard. Excess 
                  liquid can damage switches and electronics.
                </div>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Step 5: Reassemble and Test
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-3">
                  Once everything is completely dry, reattach keycaps using your reference photo. 
                  Press each cap firmly onto its switch until you hear/feel it click into place.
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  After reassembly, use our <a href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  keyboard tester</a> to verify every key registers correctly. This ensures no keys 
                  were damaged during cleaning and all caps are properly seated.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Cleaning Different Keyboard Types
            </h2>
            
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Mechanical Keyboards
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Mechanical keyboards are the easiest to deep clean due to removable keycaps. 
                  Be extra careful around the switches—don&apos;t force cleaning tools into the switch 
                  housing. For lubed switches, avoid using too much alcohol as it can wash away lubricant.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Membrane Keyboards
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Most membrane keyboards have non-removable keycaps. Focus on surface cleaning with 
                  compressed air and alcohol wipes. Some membrane keyboards can be disassembled for 
                  cleaning—check your manual before attempting.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Laptop Keyboards
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Be extremely cautious with laptop keyboards. Use compressed air at low pressure and 
                  very lightly dampened cloths. Never remove laptop keycaps unless you have experience—
                  the scissor mechanisms are fragile and easily broken.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Preventing Future Buildup
            </h2>
            <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Wash your hands before typing sessions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Avoid eating and drinking at your keyboard</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Use a keyboard cover when not in use</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Keep your workspace dust-free</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Schedule regular quick cleanings (weekly)</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Conclusion
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Regular keyboard cleaning is a simple habit that pays dividends in performance, 
              longevity, and hygiene. Whether you do a quick weekly wipe-down or a thorough 
              monthly deep clean, your keyboard (and your fingers) will thank you.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              After cleaning, always <a href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              test your keyboard</a> to ensure all keys are working correctly. Happy typing!
            </p>
          </section>
        </div>

        <footer className="border-t border-zinc-200 dark:border-zinc-700 pt-6 mt-8">
          <div className="flex items-center justify-between">
            <a
              href="/blog"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              ← Back to Blog
            </a>
            <a
              href="/"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Test Your Keyboard
            </a>
          </div>
        </footer>
      </article>
    </>
  );
}

