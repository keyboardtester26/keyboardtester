"use client";

import { useKeyboard } from "@/contexts/KeyboardContext";
import { KEYBOARD_LAYOUT, type KeyLayout } from "@/lib/keyboardLayout";
import Key from "./Key";

interface KeyboardProps {
  layout?: KeyLayout;
}

export default function Keyboard({ layout = "ANSI" }: KeyboardProps) {
  const { pressedKeys, testedKeys } = useKeyboard();

  const rows = KEYBOARD_LAYOUT;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        id="board"
        className="bg-zinc-100 rounded-2xl mx-auto box-border py-8 px-4 pb-4 relative border border-zinc-200 shadow-sm"
      >
        {/* Function row */}
        <div className="flex justify-between mb-1">
          <Key
            keyDef={rows[0].keys[0]}
            isPressed={pressedKeys.has(rows[0].keys[0].code)}
            hasBeenTested={testedKeys.has(rows[0].keys[0].code)}
            isFunctionRow
            isText
          />
          {rows[0].keys.slice(1, 4).map((key) => (
            <Key
              key={key.code}
              keyDef={key}
              isPressed={pressedKeys.has(key.code)}
              hasBeenTested={testedKeys.has(key.code)}
              isFunctionRow
              isYellow
            />
          ))}
          {rows[0].keys.slice(4).map((key) => (
            <Key
              key={key.code}
              keyDef={key}
              isPressed={pressedKeys.has(key.code)}
              hasBeenTested={testedKeys.has(key.code)}
              isFunctionRow
            />
          ))}
        </div>

        {/* Number row */}
        <div className="flex justify-between mb-1">
          {rows[1].keys.map((key) => (
            <Key
              key={key.code}
              keyDef={key}
              isPressed={pressedKeys.has(key.code)}
              hasBeenTested={testedKeys.has(key.code)}
              isNumberRow
            />
          ))}
        </div>

        {/* QWERTY row */}
        <div className="flex justify-between mb-1">
          {rows[2].keys.map((key) => (
            <Key
              key={key.code}
              keyDef={key}
              isPressed={pressedKeys.has(key.code)}
              hasBeenTested={testedKeys.has(key.code)}
            />
          ))}
        </div>

        {/* ASDF row */}
        <div className="flex justify-between mb-1">
          {rows[3].keys.map((key) => (
            <Key
              key={key.code}
              keyDef={key}
              isPressed={pressedKeys.has(key.code)}
              hasBeenTested={testedKeys.has(key.code)}
            />
          ))}
        </div>

        {/* ZXCV row */}
        <div className="flex justify-between mb-1">
          {rows[4].keys.map((key) => (
            <Key
              key={key.code}
              keyDef={key}
              isPressed={pressedKeys.has(key.code)}
              hasBeenTested={testedKeys.has(key.code)}
            />
          ))}
        </div>

        {/* Bottom row with arrows */}
        <div className="flex justify-between items-start">
          <div className="flex justify-between flex-1">
            {rows[5].keys.slice(0, 4).map((key) => (
              <Key
                key={key.code}
                keyDef={key}
                isPressed={pressedKeys.has(key.code)}
                hasBeenTested={testedKeys.has(key.code)}
                isText
              />
            ))}
            <Key
              keyDef={rows[5].keys[4]}
              isPressed={pressedKeys.has(rows[5].keys[4].code)}
              hasBeenTested={testedKeys.has(rows[5].keys[4].code)}
              isSpace
            />
            {rows[5].keys.slice(5).map((key) => (
              <Key
                key={key.code}
                keyDef={key}
                isPressed={pressedKeys.has(key.code)}
                hasBeenTested={testedKeys.has(key.code)}
                isText
              />
            ))}
          </div>

          {/* Arrow keys */}
          <div className="flex flex-col justify-between ml-1 mt-1">
            <div className="flex justify-center">
              <Key
                keyDef={{ label: "↑", code: "ArrowUp", width: 1 }}
                isPressed={pressedKeys.has("ArrowUp")}
                hasBeenTested={testedKeys.has("ArrowUp")}
                isArrow
              />
            </div>
            <div className="flex justify-center">
              <Key
                keyDef={{ label: "←", code: "ArrowLeft", width: 1 }}
                isPressed={pressedKeys.has("ArrowLeft")}
                hasBeenTested={testedKeys.has("ArrowLeft")}
                isArrow
              />
              <Key
                keyDef={{ label: "↓", code: "ArrowDown", width: 1 }}
                isPressed={pressedKeys.has("ArrowDown")}
                hasBeenTested={testedKeys.has("ArrowDown")}
                isArrow
              />
              <Key
                keyDef={{ label: "→", code: "ArrowRight", width: 1 }}
                isPressed={pressedKeys.has("ArrowRight")}
                hasBeenTested={testedKeys.has("ArrowRight")}
                isArrow
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
