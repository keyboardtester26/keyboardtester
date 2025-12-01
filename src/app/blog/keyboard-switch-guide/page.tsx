import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyboard Switch Guide: Cherry MX, Gateron, and More Explained",
  description:
    "Complete guide to mechanical keyboard switches. Learn about Cherry MX, Gateron, Kailh, and other switch types. Understand linear, tactile, and clicky switches.",
  keywords: [
    "keyboard switch guide",
    "Cherry MX switches",
    "Gateron switches",
    "linear vs tactile switches",
    "mechanical keyboard switches",
    "switch comparison",
    "clicky switches",
    "best keyboard switches",
  ],
  openGraph: {
    title: "Ultimate Keyboard Switch Guide 2025",
    description:
      "Everything you need to know about mechanical keyboard switches - Cherry MX, Gateron, and beyond.",
    type: "article",
    publishedTime: "2024-12-28T00:00:00.000Z",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Complete Keyboard Switch Guide: Cherry MX, Gateron, and More",
  description:
    "Comprehensive guide explaining all types of mechanical keyboard switches and how to choose the right one.",
  author: {
    "@type": "Organization",
    name: "keyboardtesterhub",
  },
  publisher: {
    "@type": "Organization",
    name: "keyboardtesterhub",
  },
  datePublished: "2024-12-28",
  dateModified: "2024-12-28",
};

export default function KeyboardSwitchGuidePage() {
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
            <span>Switch Guide</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Keyboard Switch Guide: Cherry MX, Gateron, and More
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Understanding switches is key to finding your perfect mechanical keyboard. This guide 
            covers everything from basic switch types to advanced characteristics.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <time dateTime="2024-12-28">December 28, 2024</time>
            <span>•</span>
            <span>15 min read</span>
          </div>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              The Three Main Switch Types
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Mechanical switches fall into three categories based on their feel and sound profile. 
              Understanding these categories is the first step to finding your ideal switch.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-5">
                <div className="w-10 h-10 rounded-full bg-red-500 mb-3"></div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Linear</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Smooth keystroke from top to bottom with no tactile feedback. Popular for gaming 
                  due to rapid keypresses without resistance.
                </p>
              </div>
              
              <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-5">
                <div className="w-10 h-10 rounded-full bg-amber-600 mb-3"></div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Tactile</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Noticeable bump at the actuation point providing physical feedback. Preferred by 
                  typists who want confirmation of keypresses.
                </p>
              </div>
              
              <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5">
                <div className="w-10 h-10 rounded-full bg-blue-500 mb-3"></div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Clicky</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Tactile bump plus audible click sound. Satisfying for some users but can be 
                  disruptive in shared environments.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Cherry MX Switches
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Cherry MX is the original mechanical switch manufacturer and still the industry 
              standard. Their color-coded naming system has become universal.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded bg-red-500"></div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Cherry MX Red</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Linear</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Actuation</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">45g</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Travel</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">2.0mm</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Total</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">4.0mm</span>
                  </div>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  The most popular gaming switch. Light actuation force and smooth travel make 
                  it ideal for rapid keypresses. Also available as MX Speed Silver (1.2mm actuation) 
                  for even faster response.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded bg-amber-700"></div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Cherry MX Brown</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Tactile</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Actuation</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">55g</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Travel</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">2.0mm</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Total</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">4.0mm</span>
                  </div>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  The &quot;do-everything&quot; switch with subtle tactile bump. Good for both typing 
                  and gaming, though enthusiasts often find the tactility too mild.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded bg-blue-500"></div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Cherry MX Blue</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Clicky</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Actuation</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">60g</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Travel</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">2.2mm</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Total</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">4.0mm</span>
                  </div>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Classic typing switch with satisfying click. The audible feedback helps typists 
                  know exactly when keys register. Not recommended for quiet environments or 
                  double-tap gaming.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded bg-zinc-900 dark:bg-zinc-100"></div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Cherry MX Black</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Linear</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Actuation</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">60g</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Travel</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">2.0mm</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400 block">Total</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium">4.0mm</span>
                  </div>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Heavier linear switch that resists accidental keypresses. Preferred by users 
                  who rest their fingers on keys or want more deliberate input.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Gateron Switches
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Gateron produces Cherry MX-compatible switches often praised for smoother keystrokes 
              at lower prices. Many enthusiasts prefer Gateron over Cherry for linear switches.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Gateron Yellow</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Community favorite linear switch. 50g actuation provides a middle ground between 
                  Red and Black. Known for exceptional smoothness out of the box.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Gateron Milky Yellow</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Budget king with milky housing for improved LED diffusion. Often recommended 
                  as the best entry into mechanical keyboards.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Gateron Ink</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Premium line with tighter tolerances and smoother feel. Available in all 
                  three types. Considered some of the best stock switches available.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Gateron Silent</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Dampened switches for quiet operation. Available in multiple colors/weights. 
                  Great for office use or late-night typing.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Other Notable Switch Brands
            </h2>
            
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Kailh</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Known for Box switches (dust/water resistant) and speed switches. Their Kailh 
                  Box Jade/Navy are popular clicky options with a unique click bar mechanism.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Durock/JWK</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Produces many popular switches including Alpacas, Lavenders, and Tangerines. 
                  Known for smooth linears that rival lubed Cherry switches straight out of the box.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Akko</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Budget-friendly switches with impressive performance. Their CS series offers 
                  great value, and the Jelly series provides interesting color options with 
                  smooth operation.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Outemu</h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Often found in budget keyboards. While base Outemu switches are basic, their 
                  Silent Tactile and Cream Yellow switches have earned enthusiast recognition.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Switch Specifications Explained
            </h2>
            
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Actuation Force (grams)
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  The force required to register a keypress. Light (35-45g) suits fast typists 
                  and gamers. Medium (50-60g) balances speed and control. Heavy (65g+) prevents 
                  accidental presses.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Actuation Point (mm)
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  How far you need to press before the key registers. Standard is 2mm. Speed 
                  switches use 1.0-1.2mm for faster response. Lower isn&apos;t always better—it 
                  can cause accidental inputs.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Total Travel (mm)
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Total distance the key can travel. Standard is 4mm. Shorter travel (3mm) 
                  enables faster double-taps. Some typists prefer longer travel for comfort.
                </p>
              </div>
              
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Bottom-Out Force
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                  Force at full compression. Usually 15-20g higher than actuation force. 
                  Important for typists who bottom out keys rather than touch-typing.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Choosing the Right Switch
            </h2>
            
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5">
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                  For Gaming
                </h3>
                <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                  Linear switches like Cherry MX Red, Gateron Yellow, or Speed Silver. The smooth, 
                  uninterrupted travel allows rapid keypresses. Consider optical switches for 
                  the absolute lowest latency.
                </p>
              </div>
              
              <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-5">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  For Typing
                </h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Tactile switches like Cherry MX Brown, Glorious Panda, or Holy Panda. The 
                  feedback helps you type without looking and reduces bottoming out. Consider 
                  clicky if noise isn&apos;t a concern.
                </p>
              </div>
              
              <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-5">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  For Office Use
                </h3>
                <p className="text-purple-700 dark:text-purple-400 text-sm">
                  Silent switches like Cherry MX Silent Red, Gateron Silent, or Zilent V2. 
                  These dampened switches won&apos;t disturb coworkers while still providing 
                  mechanical feel.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Testing Your Switches
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              After choosing and installing switches, verify they&apos;re working correctly. Use our 
              <a href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline mx-1">
              keyboard testing tool</a> to check every switch registers and test rollover to 
              ensure your keyboard handles simultaneous keypresses properly.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Conclusion
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Switch choice is personal—there&apos;s no universally &quot;best&quot; switch. Consider trying 
              a switch tester before committing to a full keyboard. Many keyboard enthusiasts 
              own multiple keyboards with different switches for different tasks.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Hot-swappable keyboards let you change switches without soldering, perfect for 
              those still exploring their preferences. Whatever you choose, always 
              <a href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline mx-1">
              test your keyboard</a> to ensure optimal performance.
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

