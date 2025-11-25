"use client";

import { memo } from "react";
import { useKeyboard } from "@/contexts/KeyboardContext";
import type { Key } from "@/lib/keyboardLayout";

interface KeyProps {
  keyDef: Key;
  isPressed: boolean;
  hasBeenTested: boolean;
  isFunctionRow?: boolean;
  isNumberRow?: boolean;
  isSpace?: boolean;
  isArrow?: boolean;
  isText?: boolean;
  isYellow?: boolean;
}

function KeyComponent({
  keyDef,
  isPressed,
  hasBeenTested,
  isFunctionRow = false,
  isNumberRow = false,
  isSpace = false,
  isArrow = false,
  isText = false,
  isYellow = false,
}: KeyProps) {
  const { isMac } = useKeyboard();
  const { label, code, width = 1, macLabel } = keyDef;

  // Use Mac label if available and on Mac
  const displayLabel = isMac && macLabel ? macLabel : label;

  // Calculate flex value
  const flexValue = isSpace ? 1 : width === 1 ? undefined : width;

  const baseClasses =
    "rounded-full m-1 text-base leading-[1.4] box-border border cursor-pointer outline-none select-none relative font-['Quicksand',sans-serif] transition-all duration-75";

  // Heights - smaller to fit on screen
  let sizeClasses = "h-10 w-10 text-xs"; // Smaller default
  if (isFunctionRow) sizeClasses = "h-[1.8rem] w-[1.8rem] text-[10px]";
  if (isArrow) sizeClasses = "h-[1.6rem] w-[1.6rem] text-xs";
  if (isSpace) sizeClasses = "h-10 flex-1";

  // Background - matching website style with dark mode support
  const isSpacer = code.startsWith("NumpadSpacer") || code.startsWith("Spacer");
  const isYellowKey = isYellow || (code.startsWith("F") && ["F1", "F2", "F3"].includes(code));
  const bgClass = isSpacer
    ? "bg-transparent border-transparent opacity-0 pointer-events-none"
    : isYellowKey
      ? "bg-amber-200 dark:bg-amber-900/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
      : isPressed
        ? "bg-emerald-500 dark:bg-emerald-600 border-emerald-400 dark:border-emerald-500 text-white"
        : hasBeenTested
          ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
          : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300";

  const shadowClass = isPressed
    ? "shadow-md"
    : "shadow-sm";

  const pressedClass = isPressed
    ? "scale-95 ring-2 ring-emerald-400/30"
    : "";

  // Text alignment - handle Mac symbols
  const isBackspace = code === "Backspace";
  const isNumpadEnter = code === "NumpadEnter";
  const textAlignClass = isText
    ? (displayLabel.toLowerCase().includes("shift") || displayLabel.toLowerCase().includes("caps") || displayLabel === "⌃" || displayLabel === "⌘" || displayLabel === "⌥")
      ? "text-left pl-4 text-[10px]"
      : (displayLabel.toLowerCase().includes("enter") || isBackspace || isNumpadEnter)
        ? "text-center text-[9px] px-1"
        : "text-center text-[10px]"
    : "text-center";

  // Number row with shift symbols
  const getDisplayLabel = () => {
    // Special handling for Backspace
    if (isBackspace) {
      return "⌫"; // Unicode backspace symbol
    }
    
    // Special handling for Numpad Enter - use shorter text
    if (code === "NumpadEnter") {
      return "Ent"; // Shorter text for numpad Enter
    }
    
    if (isNumberRow) {
      const map: Record<string, string> = {
        "`": "~\n`",
        "1": "!\n1",
        "2": "@\n2",
        "3": "#\n3",
        "4": "$\n4",
        "5": "%\n5",
        "6": "^\n6",
        "7": "&\n7",
        "8": "*\n8",
        "9": "(\n9",
        "0": ")\n0",
        "-": "_\n-",
        "=": "+\n=",
      };
      return map[label] || label;
    }

    const symbolMap: Record<string, string> = {
      "[": "{\n[",
      "]": "}\n]",
      "\\": "|\n\\",
      ";": ":\n;",
      "'": '"\n\'',
      ",": "<\n,",
      ".": ">\n.",
      "/": "?\n/",
    };
    return symbolMap[label] || displayLabel;
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses} ${shadowClass} ${bgClass} ${pressedClass} ${textAlignClass} ${
        hasBeenTested && !isPressed ? "ring-1 ring-emerald-300/40" : ""
      } ${isBackspace ? "overflow-hidden text-ellipsis whitespace-nowrap" : ""}`}
      style={flexValue ? { flex: flexValue } : {}}
      data-key-code={code}
      title={isBackspace ? "Backspace" : undefined}
    >
      {getDisplayLabel()}
    </button>
  );
}

export default memo(KeyComponent);
