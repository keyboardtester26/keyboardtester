"use client";

import { useEffect } from "react";

type AdSlotProps = {
  position?: "top" | "sidebar" | "bottom" | string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({ position }: AdSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).adsbygoogle.push({});
      }
    } catch {
      // fail silently – ads are optional
    }
  }, []);

  return (
    <div
      className="flex w-full justify-center"
      aria-label={position ? `Advertisement – ${position} position` : "Advertisement"}
    >
      {/* Replace data-ad-client and data-ad-slot with your own values from AdSense */}
      <ins
        className="adsbygoogle block w-full max-w-[728px]"
        style={{ minHeight: 90 }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="0000000000"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}


