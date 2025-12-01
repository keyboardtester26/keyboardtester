"use client";

import { useState, useRef, useEffect } from "react";
import { Settings as SettingsIcon, Moon, Sun, Monitor, ChevronDown } from "lucide-react";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  
  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    
    // Detect Mac platform
    if (typeof navigator !== "undefined") {
      const detectedMac = /Mac|iPhone|iPod|iPad/i.test(navigator.platform);
      setIsMac(detectedMac);
    }
    
    // Get current theme from document class
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setCurrentTheme(isDark ? "dark" : "light");
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Function to set light theme
  const setLightTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Setting light theme");
    document.documentElement.classList.remove("dark");
    setCurrentTheme("light");
    try {
      localStorage.setItem("theme", "light");
    } catch (err) {
      // ignore
    }
    // Force re-render by triggering state change
    window.dispatchEvent(new Event("themechange"));
  };

  // Function to set dark theme
  const setDarkTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Setting dark theme");
    document.documentElement.classList.add("dark");
    setCurrentTheme("dark");
    try {
      localStorage.setItem("theme", "dark");
    } catch (err) {
      // ignore
    }
    // Force re-render by triggering state change
    window.dispatchEvent(new Event("themechange"));
  };

  // Function to set auto theme
  const setAutoTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark");
      setCurrentTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setCurrentTheme("light");
    }
    try {
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    } catch (err) {
      // ignore
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <SettingsIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Settings</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        aria-label="Settings"
        aria-expanded={isOpen}
      >
        <SettingsIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Settings</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900 z-50">
          <div className="p-3 space-y-3">
            {/* Platform Detection */}
            <div className="pb-2 border-b border-zinc-200 dark:border-zinc-700">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Platform</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-100">
                {isMac ? "macOS" : "Windows"}
              </p>
            </div>

            {/* Theme Selection */}
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Theme</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={(e) => setLightTheme(e)}
                  className={`flex flex-col items-center gap-1 rounded-md border p-2 text-xs transition-colors cursor-pointer ${
                    currentTheme === "light"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => setDarkTheme(e)}
                  className={`flex flex-col items-center gap-1 rounded-md border p-2 text-xs transition-colors cursor-pointer ${
                    currentTheme === "dark"
                      ? "border-emerald-500 bg-emerald-900/30 text-emerald-400"
                      : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => setAutoTheme(e)}
                  className="flex flex-col items-center gap-1 rounded-md border p-2 text-xs transition-colors cursor-pointer border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  <Monitor className="h-4 w-4" />
                  <span>Auto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
