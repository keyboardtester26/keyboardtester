"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface KeyboardContextType {
  pressedKeys: Set<string>;
  testedKeys: Set<string>;
  lastKeyEvent: KeyboardEvent | null;
  isMac: boolean;
}

const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);

export function KeyboardProvider({ children }: { children: ReactNode }) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [testedKeys, setTestedKeys] = useState<Set<string>>(new Set());
  const [lastKeyEvent, setLastKeyEvent] = useState<KeyboardEvent | null>(null);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect Mac platform
    const checkMac = /Mac|iPhone|iPod|iPad/i.test(navigator.platform);
    setIsMac(checkMac);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default for Space and arrow keys to avoid scrolling
      if (["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(event.code)) {
        event.preventDefault();
      }

      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(event.code);
        return next;
      });

      setTestedKeys((prev) => {
        const next = new Set(prev);
        next.add(event.code);
        return next;
      });

      setLastKeyEvent(event);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(event.code);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <KeyboardContext.Provider value={{ pressedKeys, testedKeys, lastKeyEvent, isMac }}>
      {children}
    </KeyboardContext.Provider>
  );
}

export function useKeyboard() {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error("useKeyboard must be used within KeyboardProvider");
  }
  return context;
}
