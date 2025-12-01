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
      className="flex w-full justify-center my-4"
      aria-label={position ? `Advertisement – ${position} position` : "Advertisement"}
    >
      {/* Ad container with theme-aware styling - matches keyboard container colors exactly */}
      <div className="w-full max-w-[728px] min-h-[90px] rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
        <ins
          className="adsbygoogle block w-full"
          style={{ 
            minHeight: 90, 
            display: "block"
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="0000000000"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}


