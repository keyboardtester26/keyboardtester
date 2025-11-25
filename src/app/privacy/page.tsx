import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Keyboard Tester Pro. Learn how we handle data, cookies, and third‑party services like analytics and advertising.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <p className="text-sm leading-relaxed text-zinc-600">
        Keyboard Tester Pro is designed to be a simple, browser‑based tool to
        test your keyboard. We care about your privacy and aim to keep the
        amount of data we collect to a minimum.
      </p>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
        <h2 className="text-base font-semibold text-zinc-900">
          1. Keyboard input
        </h2>
        <p>
          All key presses you make inside Keyboard Tester Pro are processed{" "}
          <span className="font-medium">
            locally in your browser using JavaScript
          </span>
          . We do not send your individual key presses to any server that we
          control.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
        <h2 className="text-base font-semibold text-zinc-900">
          2. Cookies and third‑party services
        </h2>
        <p>
          We may use third‑party services such as analytics or advertising
          networks (for example, Google AdSense or Google Analytics). These
          services may use cookies, web beacons, or similar technologies to
          deliver ads, measure performance, and understand aggregated usage.
        </p>
        <p>
          These cookies are controlled by the third parties and are subject to
          their own privacy policies. You can usually control cookies through
          your browser settings.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
        <h2 className="text-base font-semibold text-zinc-900">
          3. Log data & device information
        </h2>
        <p>
          Like most websites, our hosting provider may automatically collect
          basic technical information such as IP address, browser type, and
          pages visited for security and performance monitoring. This data is
          typically stored in server logs and is used in an aggregated way.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
        <h2 className="text-base font-semibold text-zinc-900">
          4. Advertising
        </h2>
        <p>
          If ads are displayed on Keyboard Tester Pro, they may be served by
          third‑party networks. These providers may use cookies to show
          relevant ads and to limit how often you see the same advertisement.
          Please refer to the respective provider&apos;s documentation for
          detailed information on how they handle data.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
        <h2 className="text-base font-semibold text-zinc-900">
          5. Your choices
        </h2>
        <p>
          You can disable cookies in your browser settings, use browser privacy
          modes, or install ad‑blocking and tracking‑protection extensions if
          you prefer. Note that doing so may affect how some features or ads
          are displayed.
        </p>
      </section>

      <section className="space-y-2 text-sm leading-relaxed text-zinc-600">
        <h2 className="text-base font-semibold text-zinc-900">
          6. Contact
        </h2>
        <p>
          If you have any questions about this privacy policy or how your data
          is handled, please contact us via the website where Keyboard Tester
          Pro is hosted.
        </p>
      </section>
    </div>
  );
}


