export type KeyLayout = "ANSI" | "ISO";

export interface Key {
  label: string;
  code: string;
  width: number; // Width in units (1 = standard key)
  rowSpan?: number; // Row span for tall keys
  variant?: "default" | "modifier" | "function" | "numpad";
  macLabel?: string; // Alternative label for Mac
}

export interface Row {
  keys: Key[];
}

// Detect if running on Mac
const isMac = typeof window !== "undefined" && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

// Standard ANSI keyboard layout - cross-platform compatible
export const KEYBOARD_LAYOUT: Row[] = [
  // Function row
  {
    keys: [
      { label: "Esc", code: "Escape", width: 1 },
      { label: "F1", code: "F1", width: 1, variant: "function" },
      { label: "F2", code: "F2", width: 1, variant: "function" },
      { label: "F3", code: "F3", width: 1, variant: "function" },
      { label: "F4", code: "F4", width: 1, variant: "function" },
      { label: "F5", code: "F5", width: 1, variant: "function" },
      { label: "F6", code: "F6", width: 1, variant: "function" },
      { label: "F7", code: "F7", width: 1, variant: "function" },
      { label: "F8", code: "F8", width: 1, variant: "function" },
      { label: "F9", code: "F9", width: 1, variant: "function" },
      { label: "F10", code: "F10", width: 1, variant: "function" },
      { label: "F11", code: "F11", width: 1, variant: "function" },
      { label: "F12", code: "F12", width: 1, variant: "function" },
    ],
  },
  // Number row
  {
    keys: [
      { label: "`", code: "Backquote", width: 1 },
      { label: "1", code: "Digit1", width: 1 },
      { label: "2", code: "Digit2", width: 1 },
      { label: "3", code: "Digit3", width: 1 },
      { label: "4", code: "Digit4", width: 1 },
      { label: "5", code: "Digit5", width: 1 },
      { label: "6", code: "Digit6", width: 1 },
      { label: "7", code: "Digit7", width: 1 },
      { label: "8", code: "Digit8", width: 1 },
      { label: "9", code: "Digit9", width: 1 },
      { label: "0", code: "Digit0", width: 1 },
      { label: "-", code: "Minus", width: 1 },
      { label: "=", code: "Equal", width: 1 },
      { label: "Backspace", code: "Backspace", width: 2 },
    ],
  },
  // QWERTY row
  {
    keys: [
      { label: "Tab", code: "Tab", width: 1.5 },
      { label: "Q", code: "KeyQ", width: 1 },
      { label: "W", code: "KeyW", width: 1 },
      { label: "E", code: "KeyE", width: 1 },
      { label: "R", code: "KeyR", width: 1 },
      { label: "T", code: "KeyT", width: 1 },
      { label: "Y", code: "KeyY", width: 1 },
      { label: "U", code: "KeyU", width: 1 },
      { label: "I", code: "KeyI", width: 1 },
      { label: "O", code: "KeyO", width: 1 },
      { label: "P", code: "KeyP", width: 1 },
      { label: "[", code: "BracketLeft", width: 1 },
      { label: "]", code: "BracketRight", width: 1 },
      { label: "\\", code: "Backslash", width: 1.5 },
    ],
  },
  // ASDF row
  {
    keys: [
      { label: "Caps", code: "CapsLock", width: 1.75, variant: "modifier" },
      { label: "A", code: "KeyA", width: 1 },
      { label: "S", code: "KeyS", width: 1 },
      { label: "D", code: "KeyD", width: 1 },
      { label: "F", code: "KeyF", width: 1 },
      { label: "G", code: "KeyG", width: 1 },
      { label: "H", code: "KeyH", width: 1 },
      { label: "J", code: "KeyJ", width: 1 },
      { label: "K", code: "KeyK", width: 1 },
      { label: "L", code: "KeyL", width: 1 },
      { label: ";", code: "Semicolon", width: 1 },
      { label: "'", code: "Quote", width: 1 },
      { label: "Enter", code: "Enter", width: 2, rowSpan: 2 },
    ],
  },
  // ZXCV row
  {
    keys: [
      { label: "Shift", code: "ShiftLeft", width: 2.25, variant: "modifier" },
      { label: "Z", code: "KeyZ", width: 1 },
      { label: "X", code: "KeyX", width: 1 },
      { label: "C", code: "KeyC", width: 1 },
      { label: "V", code: "KeyV", width: 1 },
      { label: "B", code: "KeyB", width: 1 },
      { label: "N", code: "KeyN", width: 1 },
      { label: "M", code: "KeyM", width: 1 },
      { label: ",", code: "Comma", width: 1 },
      { label: ".", code: "Period", width: 1 },
      { label: "/", code: "Slash", width: 1 },
      { label: "Shift", code: "ShiftRight", width: 2.75, variant: "modifier" },
    ],
  },
  // Bottom row - cross-platform
  {
    keys: [
      { label: "Ctrl", code: "ControlLeft", width: 1.5, variant: "modifier", macLabel: "⌃" },
      { label: "Win", code: "MetaLeft", width: 1.25, variant: "modifier", macLabel: "⌘" },
      { label: "Alt", code: "AltLeft", width: 1.25, variant: "modifier", macLabel: "⌥" },
      { label: "Space", code: "Space", width: 6 },
      { label: "Alt", code: "AltRight", width: 1.25, variant: "modifier", macLabel: "⌥" },
      { label: "Menu", code: "ContextMenu", width: 1.25, variant: "modifier" },
      { label: "Ctrl", code: "ControlRight", width: 1.5, variant: "modifier", macLabel: "⌃" },
    ],
  },
];

// Navigation cluster
export const NAV_CLUSTER: Row[] = [
  {
    keys: [
      { label: "Prt", code: "PrintScreen", width: 1 },
      { label: "Scr", code: "ScrollLock", width: 1 },
      { label: "Pause", code: "Pause", width: 1 },
    ],
  },
  {
    keys: [
      { label: "Ins", code: "Insert", width: 1 },
      { label: "Home", code: "Home", width: 1 },
      { label: "PgUp", code: "PageUp", width: 1 },
    ],
  },
  {
    keys: [
      { label: "Del", code: "Delete", width: 1 },
      { label: "End", code: "End", width: 1 },
      { label: "PgDn", code: "PageDown", width: 1 },
    ],
  },
  {
    keys: [
      { label: "", code: "Spacer1", width: 1 },
      { label: "↑", code: "ArrowUp", width: 1 },
      { label: "", code: "Spacer2", width: 1 },
    ],
  },
  {
    keys: [
      { label: "←", code: "ArrowLeft", width: 1 },
      { label: "↓", code: "ArrowDown", width: 1 },
      { label: "→", code: "ArrowRight", width: 1 },
    ],
  },
];

// Numpad
export const NUMPAD: Row[] = [
  {
    keys: [
      { label: "Num", code: "NumLock", width: 1, variant: "numpad" },
      { label: "/", code: "NumpadDivide", width: 1, variant: "numpad" },
      { label: "*", code: "NumpadMultiply", width: 1, variant: "numpad" },
      { label: "-", code: "NumpadSubtract", width: 1, variant: "numpad" },
    ],
  },
  {
    keys: [
      { label: "7", code: "Numpad7", width: 1, variant: "numpad" },
      { label: "8", code: "Numpad8", width: 1, variant: "numpad" },
      { label: "9", code: "Numpad9", width: 1, variant: "numpad" },
      { label: "+", code: "NumpadAdd", width: 1, variant: "numpad", rowSpan: 2 },
    ],
  },
  {
    keys: [
      { label: "4", code: "Numpad4", width: 1, variant: "numpad" },
      { label: "5", code: "Numpad5", width: 1, variant: "numpad" },
      { label: "6", code: "Numpad6", width: 1, variant: "numpad" },
    ],
  },
  {
    keys: [
      { label: "1", code: "Numpad1", width: 1, variant: "numpad" },
      { label: "2", code: "Numpad2", width: 1, variant: "numpad" },
      { label: "3", code: "Numpad3", width: 1, variant: "numpad" },
      { label: "Enter", code: "NumpadEnter", width: 1, variant: "numpad", rowSpan: 2 },
    ],
  },
  {
    keys: [
      { label: "0", code: "Numpad0", width: 2, variant: "numpad" },
      { label: ".", code: "NumpadDecimal", width: 1, variant: "numpad" },
    ],
  },
];
