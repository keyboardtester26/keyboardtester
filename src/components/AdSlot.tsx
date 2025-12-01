"use client";

import { useEffect, useState } from "react";

type AdSlotProps = {
  position?: "top" | "sidebar" | "bottom" | string;
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle?: any[];
  }
}

export default function AdSlot({ position }: AdSlotProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initialize adsense
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch {
      // fail silently
    }

    return () => observer.disconnect();
  }, []);

  // Use inline styles to ensure dark mode works
  const bgColor = isDark ? "#18181b" : "#f4f4f5";
  const borderColor = isDark ? "#3f3f46" : "#e4e4e7";

  return (
    <div
      className="flex w-full justify-center my-4"
      aria-label={position ? `Advertisement – ${position} position` : "Advertisement"}
    >
      <div 
        className="w-full max-w-[728px] min-h-[90px] rounded-lg border overflow-hidden"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        <ins
          className="adsbygoogle block w-full"
          style={{ 
            minHeight: 90, 
            display: "block",
            backgroundColor: bgColor,
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


