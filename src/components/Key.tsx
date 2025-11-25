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

  // Background - matching website style
  const isYellowKey = isYellow || (code.startsWith("F") && ["F1", "F2", "F3"].includes(code));
  const bgClass = isYellowKey
    ? "bg-amber-200 border-amber-300 text-amber-900"
    : isPressed
      ? "bg-emerald-500 border-emerald-400 text-white"
      : hasBeenTested
        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
        : "bg-white border-zinc-300 text-zinc-700";

  const shadowClass = isPressed
    ? "shadow-md"
    : "shadow-sm";

  const pressedClass = isPressed
    ? "scale-95 ring-2 ring-emerald-400/30"
    : "";

  // Text alignment - handle Mac symbols
  const textAlignClass = isText
    ? (displayLabel.toLowerCase().includes("shift") || displayLabel.toLowerCase().includes("caps") || displayLabel === "⌃" || displayLabel === "⌘" || displayLabel === "⌥")
      ? "text-left pl-4 text-[10px]"
      : (displayLabel.toLowerCase().includes("enter") || displayLabel.toLowerCase().includes("back"))
        ? "text-right pr-4 text-[10px]"
        : "text-center text-[10px]"
    : "text-center";

  // Number row with shift symbols
  const getDisplayLabel = () => {
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
      }`}
      style={flexValue ? { flex: flexValue } : {}}
      data-key-code={code}
    >
      {getDisplayLabel()}
    </button>
  );
}

export default memo(KeyComponent);
