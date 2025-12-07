import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Script from "next/script";
import { KeyboardProvider } from "@/contexts/KeyboardContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Settings from "@/components/Settings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://keyboardtesterhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "keyboardtesterhub – Free Online Keyboard Tester | Test Every Key Instantly",
    template: "%s | keyboardtesterhub",
  },
  description:
    "Free online keyboard tester and key rollover test tool. Test N-key rollover, anti-ghosting, and check every key instantly. Perfect for gaming keyboards, mechanical keyboards, and troubleshooting stuck keys. Works on Windows, Mac, and Linux. No download required. Test key rollover, keyboard ghosting, and verify all keys work correctly.",
  keywords: [
    "key rollover test",
    "key rollover tester",
    "n-key rollover test",
    "keyboard rollover test",
    "keyboard tester",
    "online keyboard tester",
    "keyboard test",
    "test keyboard keys",
    "stuck keys",
    "gaming keyboard test",
    "mechanical keyboard tester",
    "keyboard diagnostic tool",
    "test keyboard online",
    "keyboard checker",
    "keyboard tester free",
    "test all keyboard keys",
    "keyboard key test",
    "anti-ghosting test",
    "keyboard troubleshooting",
    "keyboard repair tool",
    "virtual keyboard tester",
    "keyboard test software",
    "check keyboard keys",
    "keyboard functionality test",
    "test keyboard switches",
    "keyboard health check",
    "keyboard testing tool",
    "keyboard diagnostic",
    "rollover test",
    "n-key rollover",
    "anti-ghosting",
    "gaming keyboard tester",
    "mechanical keyboard test",
    "keyboard key rollover",
  ],
  authors: [{ name: "keyboardtesterhub" }],
  creator: "keyboardtesterhub",
  publisher: "keyboardtesterhub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "keyboardtesterhub",
    title: "keyboardtesterhub – Free Key Rollover Test & Keyboard Tester",
    description:
      "Test N-key rollover, key rollover, and anti-ghosting instantly. Free online keyboard tester to check every key, detect stuck keys, and diagnose keyboard problems. Perfect for gaming keyboards. Works on Windows, Mac, and Linux. No download required.",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "keyboardtesterhub - Free Online Keyboard Testing Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "keyboardtesterhub – Free Key Rollover Test & Keyboard Tester",
    description:
      "Test N-key rollover and key rollover instantly. Free keyboard tester to check every key, detect stuck keys, and test anti-ghosting. Perfect for gaming keyboards. No download required.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@keyboardtesterhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "keyboardtesterhub",
    url: siteUrl,
    description:
      "Free online keyboard tester and key rollover test tool. Test N-key rollover, key rollover, anti-ghosting, and check every key instantly. Perfect for gaming keyboards and mechanical keyboards. Works on Windows, Mac, and Linux.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "keyboardtesterhub",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "keyboardtesterhub",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Free online keyboard testing tool and key rollover tester. Test N-key rollover, key rollover, anti-ghosting, and check every key instantly. Perfect for gaming keyboards and mechanical keyboards.",
    featureList: [
      "Key rollover test",
      "N-key rollover test",
      "Anti-ghosting test",
      "Keyboard diagnostic",
      "Stuck key detection",
      "Gaming keyboard testing",
      "Mechanical keyboard tester",
    ],
    screenshot: `${siteUrl}/og-image.png`,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <meta name="google-site-verification" content="Q3bszLWhBq8W7_NYQF97AQ8j0A61pDZqQEaCSa5zY04" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="keyboardtesterhub" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(circle_at_top,_#f9fafb_0,_#e5e7eb_40%,_#e5e7eb_100%)] dark:bg-[radial-gradient(circle_at_top,_#18181b_0,_#27272a_40%,_#27272a_100%)] text-zinc-900 dark:text-zinc-100`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JNLYLGQBD0"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JNLYLGQBD0');
            `,
          }}
        />

        {/* Google AdSense */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
        />

        <ThemeProvider>
          <div className="flex min-h-screen flex-col text-zinc-900 dark:text-zinc-100">
            <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                <a href="/" className="flex items-center gap-2 sm:gap-3" aria-label="keyboardtesterhub Home">
                  <Image
                    src="/logo.png"
                    alt="keyboardtesterhub - Free Online Keyboard Tester and Key Rollover Test Tool"
                    width={240}
                    height={240}
                    className="h-24 w-auto sm:h-28 md:h-32 object-contain"
                    priority
                  />
                </a>
                <nav className="flex items-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400 sm:gap-4" aria-label="Main navigation">
                  <a
                    href="/about"
                    className="rounded-full px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    About
                  </a>
                  <a
                    href="/blog"
                    className="hidden rounded-full px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 sm:inline-flex"
                  >
                    Blog
                  </a>
                  <a
                    href="/faq"
                    className="hidden rounded-full px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 sm:inline-flex"
                  >
                    FAQ
                  </a>
                  <a
                    href="/contact"
                    className="rounded-full px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Contact
                  </a>
                  <a
                    href="/privacy"
                    className="hidden rounded-full px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 sm:inline-flex"
                  >
                    Privacy
                  </a>
                  <div className="ml-2 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                    <KeyboardProvider>
                      <Settings />
                    </KeyboardProvider>
                  </div>
                </nav>
              </div>
            </header>

            <main className="flex-1 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
              <KeyboardProvider>{children}</KeyboardProvider>
            </main>

            <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
              <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 mb-6">
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 mb-3">Tools</h3>
                    <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <li><a href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Keyboard Tester</a></li>
                      <li><a href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Key Rollover Test</a></li>
                      <li><a href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Anti-Ghosting Test</a></li>
                      <li><a href="/faq" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">FAQ</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 mb-3">Guides</h3>
                    <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <li><a href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Blog</a></li>
                      <li><a href="/blog/how-to-properly-test-a-keyboard" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">How to Test Keyboard</a></li>
                      <li><a href="/blog/best-mechanical-keyboards-gaming-2025" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Gaming Keyboards</a></li>
                      <li><a href="/blog/keyboard-switch-guide" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Switch Guide</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 mb-3">Resources</h3>
                    <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <li><a href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">About</a></li>
                      <li><a href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Contact</a></li>
                      <li><a href="/blog/membrane-vs-mechanical-keyboards" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Membrane vs Mechanical</a></li>
                      <li><a href="/blog/how-to-clean-keyboard" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Keyboard Cleaning</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 mb-3">Legal</h3>
                    <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <li><a href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacy Policy</a></li>
                      <li><a href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Terms of Use</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 flex flex-col gap-2 text-xs text-zinc-500 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    © {new Date().getFullYear()} keyboardtesterhub. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
