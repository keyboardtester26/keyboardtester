"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme from HTML class or system preference
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light";
    
    // Check if dark class is already on HTML (from blocking script)
    if (document.documentElement.classList.contains("dark")) {
      return "dark";
    }
    
    try {
      // Check localStorage for saved theme preference
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        return savedTheme;
      }
    } catch (e) {
      // localStorage might not be available (incognito mode, etc.)
    }
    
    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync with HTML class on mount
    const htmlHasDark = document.documentElement.classList.contains("dark");
    if (htmlHasDark && theme !== "dark") {
      setThemeState("dark");
    } else if (!htmlHasDark && theme !== "light") {
      setThemeState("light");
    }
  }, []);

  useEffect(() => {
    // Apply theme to document immediately
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
      
      // Force a reflow to ensure styles apply
      void html.offsetHeight;
    }
    
    // Save to localStorage only after mount (to avoid incognito issues)
    if (mounted && typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {
        // localStorage might not be available, ignore
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Always provide context value, even before mounting
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

