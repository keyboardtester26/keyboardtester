"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface KeyboardContextType {
  pressedKeys: Set<string>;
  testedKeys: Set<string>;
  lastKeyEvent: KeyboardEvent | null;
  isMac: boolean;
  reset: () => void;
}

export const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);

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
      // Prevent default for function keys (F1-F12) to avoid browser shortcuts
      // F1: Help, F3: Find, F5: Refresh, F11: Fullscreen, F12: DevTools, etc.
      const functionKeys = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
      
      // Prevent default for Space, arrow keys, and all function keys
      if (["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", ...functionKeys].includes(event.code)) {
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

  const reset = () => {
    setPressedKeys(new Set());
    setTestedKeys(new Set());
    setLastKeyEvent(null);
  };

  return (
    <KeyboardContext.Provider value={{ pressedKeys, testedKeys, lastKeyEvent, isMac, reset }}>
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
