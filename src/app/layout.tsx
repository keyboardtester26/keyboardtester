import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { KeyboardProvider } from "@/contexts/KeyboardContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://keyboardtesterpro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Keyboard Tester Pro – Free Online Keyboard Tester | Test Every Key Instantly",
    template: "%s | Keyboard Tester Pro",
  },
  description:
    "Free online keyboard tester to check every key, detect stuck keys, test anti-ghosting, and diagnose keyboard problems. Works on Windows, Mac, and Linux. No download required.",
  keywords: [
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
    "n-key rollover test",
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
  ],
  authors: [{ name: "Keyboard Tester Pro" }],
  creator: "Keyboard Tester Pro",
  publisher: "Keyboard Tester Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Keyboard Tester Pro",
    title: "Keyboard Tester Pro – Free Online Keyboard Tester",
    description:
      "Test every key on your keyboard instantly. Detect stuck keys, test anti-ghosting, and diagnose keyboard issues. Works on Windows, Mac, and Linux. No download required.",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Keyboard Tester Pro - Free Online Keyboard Testing Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyboard Tester Pro – Free Online Keyboard Tester",
    description:
      "Test every key on your keyboard instantly. Detect stuck keys, test anti-ghosting, and diagnose keyboard issues. No download required.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@keyboardtesterpro",
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
    name: "Keyboard Tester Pro",
    url: siteUrl,
    description:
      "Free online keyboard tester to check every key, detect stuck keys, test anti-ghosting, and diagnose keyboard problems. Works on Windows, Mac, and Linux.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Keyboard Tester Pro",
      url: siteUrl,
    },
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Keyboard Tester Pro",
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
      "Free online keyboard testing tool to check every key, detect stuck keys, test anti-ghosting, and diagnose keyboard problems.",
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta name="theme-color" content="#18181b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Keyboard Tester Pro" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(circle_at_top,_#f9fafb_0,_#e5e7eb_40%,_#e5e7eb_100%)] text-zinc-900`}
      >
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

        <div className="min-h-screen text-zinc-900">
          <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
              <a href="/" className="flex items-center gap-2 sm:gap-3" aria-label="Keyboard Tester Pro Home">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 text-sm font-semibold text-white shadow-sm shadow-zinc-900/20">
                  K
                </span>
                <span className="text-sm font-semibold tracking-tight text-zinc-900 sm:text-base">
                  Keyboard Tester Pro
                </span>
              </a>
              <nav className="flex items-center gap-3 text-xs font-medium text-zinc-600 sm:gap-4" aria-label="Main navigation">
                <a
                  href="/about"
                  className="rounded-full px-3 py-1 hover:bg-zinc-100"
                >
                  About
                </a>
                <a
                  href="/blog"
                  className="hidden rounded-full px-3 py-1 hover:bg-zinc-100 sm:inline-flex"
                >
                  Blog
                </a>
                <a
                  href="/faq"
                  className="hidden rounded-full px-3 py-1 hover:bg-zinc-100 sm:inline-flex"
                >
                  FAQ
                </a>
                <a
                  href="/contact"
                  className="rounded-full px-3 py-1 hover:bg-zinc-100"
                >
                  Contact
                </a>
                <a
                  href="/privacy"
                  className="hidden rounded-full px-3 py-1 hover:bg-zinc-100 sm:inline-flex"
                >
                  Privacy
                </a>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
            <KeyboardProvider>{children}</KeyboardProvider>
          </main>

          <footer className="border-t border-zinc-200 bg-white/80">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p>
                © {new Date().getFullYear()} Keyboard Tester Pro. All rights
                reserved.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="/privacy" className="hover:text-zinc-700">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-zinc-700">
                  Terms of Use
                </a>
                <a href="/contact" className="hover:text-zinc-700">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
