"use client";

import { useKeyboard } from "@/contexts/KeyboardContext";
import { KEYBOARD_LAYOUT, NUMPAD, type KeyLayout } from "@/lib/keyboardLayout";
import Key from "./Key";

interface KeyboardProps {
  layout?: KeyLayout;
  showNumpad?: boolean;
}

export default function Keyboard({ layout = "ANSI", showNumpad = true }: KeyboardProps) {
  const { pressedKeys, testedKeys } = useKeyboard();

  const rows = KEYBOARD_LAYOUT;

  return (
    <div className="w-full mx-auto flex justify-center">
      <div className={`flex gap-4 flex-col ${showNumpad ? 'lg:flex-row' : ''} items-start`}>
        {/* Main Keyboard */}
        <div className={showNumpad ? "flex-shrink-0 max-w-4xl" : "flex-shrink-0 max-w-4xl"}>
          <div
            id="board"
            className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl box-border py-8 px-4 pb-4 relative border border-zinc-200 dark:border-zinc-700 shadow-sm"
            style={{ width: 'fit-content' }}
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

        {/* Numpad */}
        {showNumpad && (
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl box-border py-4 px-5 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              {/* Row 1: Del, Pause, PrtSc, Home */}
              <div className="flex mb-1 gap-1">
                {NUMPAD[0].keys.map((key) => (
                  <Key
                    key={key.code}
                    keyDef={key}
                    isPressed={pressedKeys.has(key.code)}
                    hasBeenTested={testedKeys.has(key.code)}
                    isText={key.variant === "numpad"}
                  />
                ))}
              </div>
              
              {/* Row 2: NumLock, /, *, - */}
              <div className="flex mb-1 gap-1">
                {NUMPAD[1].keys.map((key) => (
                  <Key
                    key={key.code}
                    keyDef={key}
                    isPressed={pressedKeys.has(key.code)}
                    hasBeenTested={testedKeys.has(key.code)}
                    isText={key.variant === "numpad"}
                  />
                ))}
              </div>
              
              {/* Rows 3-4: 7,8,9,4,5,6 with + spanning both rows */}
              <div className="flex mb-1 gap-1">
                {/* Left column: numbers */}
                <div className="flex flex-col gap-1">
                  {/* Row 3: 7, 8, 9 */}
                  <div className="flex gap-1">
                    {NUMPAD[2].keys.slice(0, 3).map((key) => (
                      <Key
                        key={key.code}
                        keyDef={key}
                        isPressed={pressedKeys.has(key.code)}
                        hasBeenTested={testedKeys.has(key.code)}
                        isText={key.variant === "numpad"}
                      />
                    ))}
                  </div>
                  {/* Row 4: 4, 5, 6 */}
                  <div className="flex gap-1">
                    {NUMPAD[3].keys.map((key) => (
                      <Key
                        key={key.code}
                        keyDef={key}
                        isPressed={pressedKeys.has(key.code)}
                        hasBeenTested={testedKeys.has(key.code)}
                        isText={key.variant === "numpad"}
                      />
                    ))}
                  </div>
                </div>
                {/* Right column: + key spanning 2 rows - aligned with - button */}
                <div className="flex flex-col">
                  <Key
                    keyDef={NUMPAD[2].keys[3]}
                    isPressed={pressedKeys.has(NUMPAD[2].keys[3].code)}
                    hasBeenTested={testedKeys.has(NUMPAD[2].keys[3].code)}
                    isText={NUMPAD[2].keys[3].variant === "numpad"}
                  />
                  <div className="h-1" />
                  <div className="h-10 w-10" /> {/* Spacer matching key height */}
                </div>
              </div>
              
              {/* Rows 5-6: 1,2,3,0,. with Enter spanning both rows */}
              <div className="flex gap-1">
                {/* Left column: numbers */}
                <div className="flex flex-col gap-1">
                  {/* Row 5: 1, 2, 3 */}
                  <div className="flex gap-1">
                    {NUMPAD[4].keys.slice(0, 3).map((key) => (
                      <Key
                        key={key.code}
                        keyDef={key}
                        isPressed={pressedKeys.has(key.code)}
                        hasBeenTested={testedKeys.has(key.code)}
                        isText={key.variant === "numpad"}
                      />
                    ))}
                  </div>
                  {/* Row 6: 0 (double width), . */}
                  <div className="flex gap-1">
                    {NUMPAD[5].keys.map((key) => (
                      <Key
                        key={key.code}
                        keyDef={key}
                        isPressed={pressedKeys.has(key.code)}
                        hasBeenTested={testedKeys.has(key.code)}
                        isText={key.variant === "numpad"}
                      />
                    ))}
                  </div>
                </div>
                {/* Right column: Enter key spanning 2 rows - aligned with - button */}
                <div className="flex flex-col">
                  <Key
                    keyDef={NUMPAD[4].keys[3]}
                    isPressed={pressedKeys.has(NUMPAD[4].keys[3].code)}
                    hasBeenTested={testedKeys.has(NUMPAD[4].keys[3].code)}
                    isText={NUMPAD[4].keys[3].variant === "numpad"}
                  />
                  <div className="h-1" />
                  <div className="h-10 w-10" /> {/* Spacer matching key height */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
