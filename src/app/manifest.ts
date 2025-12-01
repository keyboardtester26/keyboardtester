import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "keyboardtesterhub - Free Online Keyboard Tester",
    short_name: "keyboardtesterhub",
    description:
      "Free online keyboard tester to check every key, detect stuck keys, test anti-ghosting, and diagnose keyboard problems. Works on Windows, Mac, and Linux.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18181b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["utilities", "productivity", "tools"],
    lang: "en",
    orientation: "portrait-primary",
  };
}

