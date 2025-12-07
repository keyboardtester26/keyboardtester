"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Script from "next/script";
import { jsPDF } from "jspdf";
import { CheckCircle2, XCircle, AlertTriangle, Check, X, RotateCcw } from "lucide-react";
import { useKeyboard } from "@/contexts/KeyboardContext";
import Keyboard from "@/components/Keyboard";
import AdSlot from "@/components/AdSlot";

type KeyEventInfo = {
  key: string;
  code: string;
  location: number;
  timestamp: string;
  repeat: boolean;
};

type MouseEventInfo = {
  type: "left" | "right" | "middle";
  x: number;
  y: number;
  timestamp: string;
};

const MAX_HISTORY = 12;

export default function Home() {
  const { pressedKeys, testedKeys, lastKeyEvent, reset: resetContext } = useKeyboard();
  const [lastEvent, setLastEvent] = useState<KeyEventInfo | null>(null);
  const [history, setHistory] = useState<KeyEventInfo[]>([]);
  const [maxSimultaneous, setMaxSimultaneous] = useState(0);
  const [totalPresses, setTotalPresses] = useState(0);
  const [perKeyCounts, setPerKeyCounts] = useState<Record<string, number>>({});
  const [lastMouseEvent, setLastMouseEvent] = useState<MouseEventInfo | null>(
    null
  );
  const [mouseHistory, setMouseHistory] = useState<MouseEventInfo[]>([]);
  const [firstInteractionAt, setFirstInteractionAt] = useState<Date | null>(
    null
  );
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [keyboardLayout, setKeyboardLayout] = useState<"ANSI" | "ISO">("ANSI");
  const [showNumpad, setShowNumpad] = useState(true);
  
  // Gaming test states
  const [gamingTestActive, setGamingTestActive] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<string | null>(null);
  const [comboResults, setComboResults] = useState<Record<string, { passed: boolean; keysPressed: string[]; expected: string[] }>>({});
  const [keyPressTimings, setKeyPressTimings] = useState<Record<string, number[]>>({});
  // Separate counters for gaming test response time (reset when test starts)
  const [gamingTotalPresses, setGamingTotalPresses] = useState(0);
  const [rapidPressCount, setRapidPressCount] = useState(0);
  const [rapidPressStartTime, setRapidPressStartTime] = useState<number | null>(null);
  const lastKeyPressTimeRef = useRef<number | null>(null);
  const processedKeyEventRef = useRef<KeyboardEvent | null>(null);

  // Gaming combo presets
  const gamingCombos: Record<string, string[]> = {
    "WASD + Space": ["KeyW", "KeyA", "KeyS", "KeyD", "Space"],
    "WASD + Shift": ["KeyW", "KeyA", "KeyS", "KeyD", "ShiftLeft"],
    "WASD + Space + Shift": ["KeyW", "KeyA", "KeyS", "KeyD", "Space", "ShiftLeft"],
    "WASD + Ctrl": ["KeyW", "KeyA", "KeyS", "KeyD", "ControlLeft"],
    "QWE + ASD": ["KeyQ", "KeyW", "KeyE", "KeyA", "KeyS", "KeyD"],
    "Arrow Keys": ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
    "Number Row": ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5"],
  };

  // Sync context state with local state for display
  useEffect(() => {
    if (lastKeyEvent) {
      const now = Date.now();
      const info: KeyEventInfo = {
        key: lastKeyEvent.key,
        code: lastKeyEvent.code,
        location: lastKeyEvent.location,
        timestamp: new Date().toLocaleTimeString(),
        repeat: lastKeyEvent.repeat,
      };
      setLastEvent(info);
      setHistory((prev) => [info, ...prev].slice(0, MAX_HISTORY));
      setMaxSimultaneous((prevMax) =>
        pressedKeys.size > prevMax ? pressedKeys.size : prevMax
      );
      setTotalPresses((prev) => prev + 1);
      setPerKeyCounts((prev) => {
        const next = { ...prev };
        next[lastKeyEvent.code] = (next[lastKeyEvent.code] || 0) + 1;
        return next;
      });
      
      if (!firstInteractionAt) {
        setFirstInteractionAt(new Date());
      }
    }
  }, [lastKeyEvent, pressedKeys, firstInteractionAt]);

  // Separate effect for gaming test response time tracking
  useEffect(() => {
    // Only track when gaming test is active and we have a new key event
    // Use ref to prevent processing the same event multiple times
    if (gamingTestActive && lastKeyEvent && !lastKeyEvent.repeat && processedKeyEventRef.current !== lastKeyEvent) {
      processedKeyEventRef.current = lastKeyEvent;
      const now = Date.now();
      
      // Increment gaming test total presses counter (only for non-repeat events)
      setGamingTotalPresses((prev) => prev + 1);
      
      setKeyPressTimings((prev) => {
        const next = { ...prev };
        if (!next[lastKeyEvent.code]) {
          next[lastKeyEvent.code] = [];
        }
        next[lastKeyEvent.code].push(now);
        return next;
      });

      // Rapid press test - check time difference using ref
      if (lastKeyPressTimeRef.current !== null) {
        const timeDiff = now - lastKeyPressTimeRef.current;
        if (timeDiff < 100) { // Less than 100ms between presses
          setRapidPressCount((prev) => prev + 1);
        }
      }
      lastKeyPressTimeRef.current = now;
      
      setRapidPressStartTime((prev) => prev || now);
    }
  }, [gamingTestActive, lastKeyEvent]);

  // Check gaming combo results
  useEffect(() => {
    if (gamingTestActive && selectedCombo && gamingCombos[selectedCombo]) {
      const expectedKeys = gamingCombos[selectedCombo];
      const pressedArray = Array.from(pressedKeys);
      
      // Check if all expected keys are currently pressed
      const allExpectedPressed = expectedKeys.every((key) => pressedArray.includes(key));
      const exactMatch = allExpectedPressed && pressedArray.length === expectedKeys.length;
      
      // Update results whenever pressedKeys changes (even if empty, to show current state)
      setComboResults((prev) => ({
        ...prev,
        [selectedCombo]: {
          passed: exactMatch,
          keysPressed: pressedArray,
          expected: expectedKeys,
        },
      }));
    }
  }, [pressedKeys, gamingTestActive, selectedCombo]);

  // Reset function to clear all test data
  const handleReset = () => {
    // Reset context state (testedKeys, pressedKeys)
    resetContext();
    // Reset local component state
    setLastEvent(null);
    setHistory([]);
    setMaxSimultaneous(0);
    setTotalPresses(0);
    setPerKeyCounts({});
    setLastMouseEvent(null);
    setMouseHistory([]);
    setFirstInteractionAt(null);
    setGamingTestActive(false);
    setSelectedCombo(null);
    setComboResults({});
    setKeyPressTimings({});
    setGamingTotalPresses(0);
    setRapidPressCount(0);
    setRapidPressStartTime(null);
    lastKeyPressTimeRef.current = null;
    processedKeyEventRef.current = null;
  };

  const currentlyPressed = Array.from(pressedKeys.values());
  const uniqueCodes = testedKeys;

  const testDurationSeconds = useMemo(() => {
    if (!firstInteractionAt) return 0;
    const diffMs = Date.now() - firstInteractionAt.getTime();
    return Math.max(0, Math.round(diffMs / 1000));
  }, [firstInteractionAt]);

  // Enhanced FAQ Schema with more questions
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does keyboardtesterhub work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "keyboardtesterhub listens to keyboard events in your browser. When you press a key, the matching key lights up on the virtual keyboard so you can see exactly what is being detected. All processing happens locally in your browser - no data is sent to servers.",
        },
      },
      {
        "@type": "Question",
        name: "Is keyboardtesterhub free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, keyboardtesterhub is completely free to use in your browser. There is no installation, signup, or payment required. You can test your keyboard as many times as you want.",
        },
      },
      {
        "@type": "Question",
        name: "Will my keystrokes be recorded or stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Keystrokes are processed locally in your browser only to visualize which keys are being pressed. They are never sent to a server, stored, or recorded. Your privacy is completely protected.",
        },
      },
      {
        "@type": "Question",
        name: "Does keyboardtesterhub work on Mac and Windows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, keyboardtesterhub works on all operating systems including Windows, Mac, Linux, Chrome OS, and mobile devices. It runs entirely in your web browser, so no installation is needed.",
        },
      },
      {
        "@type": "Question",
        name: "How do I test for keyboard ghosting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To test for keyboard ghosting, hold down multiple keys simultaneously (like W + A + Space for gaming). If all keys light up correctly on the virtual keyboard, your keyboard supports anti-ghosting. If some keys don't register, your keyboard has ghosting issues.",
        },
      },
      {
        "@type": "Question",
        name: "What is N-key rollover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "N-key rollover (NKRO) means your keyboard can register all keys pressed simultaneously. Gaming keyboards often support full NKRO, while standard keyboards may only support 6-key rollover. Test by pressing many keys at once and see if they all register.",
        },
      },
      {
        "@type": "Question",
        name: "How do I perform a key rollover test?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To perform a key rollover test, press multiple keys simultaneously on your keyboard. Our key rollover tester will show which keys register. Try pressing common gaming combinations like W+A+S+D+Space+Shift. If all keys light up, your keyboard passes the key rollover test. This is essential for gaming keyboards.",
        },
      },
      {
        "@type": "Question",
        name: "What is a key rollover tester?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A key rollover tester is a tool that checks how many keys your keyboard can register at the same time. Our free online key rollover tester lets you test N-key rollover, anti-ghosting, and keyboard functionality instantly in your browser. Perfect for testing gaming keyboards and mechanical keyboards.",
        },
      },
      {
        "@type": "Question",
        name: "How do I test key rollover on my keyboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use our free key rollover test tool: press multiple keys simultaneously (like WASD + Space + Shift for gaming). Watch which keys light up on the virtual keyboard. If all pressed keys register, your keyboard supports good key rollover. This test helps determine if your keyboard is suitable for gaming or fast typing.",
        },
      },
      {
        "@type": "Question",
        name: "Can I test a mechanical keyboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, keyboardtesterhub works with all keyboard types including mechanical, membrane, scissor-switch, and laptop keyboards. The tester will show you which keys are working and which may be stuck or failing.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between key rollover and anti-ghosting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Key rollover refers to how many keys can be registered simultaneously. Anti-ghosting prevents unwanted key presses when multiple keys are pressed. A keyboard can have good rollover but poor anti-ghosting, or vice versa. Our tester checks both capabilities.",
        },
      },
      {
        "@type": "Question",
        name: "How do I test keyboard ghosting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To test keyboard ghosting, press multiple keys simultaneously (like W+A+S+D+Space+Shift). If unwanted keys register or some keys don't register, your keyboard has ghosting issues. Our keyboard tester shows exactly which keys are detected, making it easy to identify ghosting problems.",
        },
      },
      {
        "@type": "Question",
        name: "What is 6-key rollover vs N-key rollover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "6-key rollover (6KRO) means your keyboard can register up to 6 keys simultaneously. N-key rollover (NKRO) means all keys can be pressed at once. Gaming keyboards often support NKRO, while standard keyboards typically support 6KRO. Use our key rollover tester to check your keyboard's capabilities.",
        },
      },
      {
        "@type": "Question",
        name: "How do I test if my keyboard is good for gaming?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Test your keyboard for gaming by checking: 1) Key rollover - press multiple keys simultaneously (WASD + Space + Shift), 2) Anti-ghosting - ensure all keys register correctly, 3) Response time - test rapid key presses, 4) All keys work - test every key individually. Our gaming keyboard tester checks all these features.",
        },
      },
      {
        "@type": "Question",
        name: "Can I test a mechanical keyboard online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our online keyboard tester works with all keyboard types including mechanical keyboards, membrane keyboards, scissor-switch keyboards, and laptop keyboards. Simply connect your mechanical keyboard and start testing. No software installation required.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know if my keyboard has N-key rollover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To test if your keyboard has N-key rollover, press as many keys as possible simultaneously using our key rollover tester. If all keys register correctly, your keyboard supports N-key rollover. Most gaming keyboards support NKRO, while standard keyboards typically support 6-key rollover.",
        },
      },
      {
        "@type": "Question",
        name: "What causes keyboard ghosting?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Keyboard ghosting occurs due to the matrix circuit design in keyboards. When certain key combinations are pressed, electrical conflicts can cause unwanted keys to register. Anti-ghosting technology prevents this by using diodes or more sophisticated circuitry. Test your keyboard's ghosting with our online tester.",
        },
      },
      {
        "@type": "Question",
        name: "Is this keyboard tester safe and private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our keyboard tester is completely safe and private. All key presses are processed locally in your browser. No data is sent to servers, stored, or recorded. Your keystrokes remain completely private and secure. The tool works entirely offline after the initial page load.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know if a key is stuck?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If a key stays highlighted on the virtual keyboard after you release it, that indicates a stuck key. This usually means the switch is damaged or there's debris preventing the key from returning to its normal position.",
        },
      },
    ],
  };

  // HowTo Schema for keyboard testing process
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Test Your Keyboard Using keyboardtesterhub",
    description: "Step-by-step guide to testing your keyboard for stuck keys, ghosting, and functionality issues.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Open keyboardtesterhub",
        text: "Navigate to keyboardtesterhub.com in your web browser. No installation or signup required.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Start Pressing Keys",
        text: "Begin pressing keys on your physical keyboard. Watch the virtual keyboard on screen - each key you press will light up in real-time.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Test All Keys",
        text: "Systematically test every key including letters, numbers, function keys, modifiers, and special keys. Keys that have been tested will remain highlighted.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Test Anti-Ghosting",
        text: "Hold down multiple keys simultaneously (like W + A + Space for gaming). All keys should light up. If some don't register, your keyboard has ghosting issues.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Check for Stuck Keys",
        text: "Release all keys and check if any remain highlighted on the virtual keyboard. Stuck keys indicate a hardware problem.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Review Test Report",
        text: "Click 'View detailed report' to see statistics including total key presses, unique keys tested, and most pressed keys. Download as PDF if needed.",
      },
    ],
  };

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://keyboardtesterhub.com",
      },
    ],
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 12;
    const marginTop = 36;
    const marginBottom = 25;
    const headerHeight = 28;
    const lineHeight = 5;
    const sectionSpacing = 10;
    const boxPadding = 4;

    // Helper function to add a new page with header
    const addPage = () => {
      doc.addPage();
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, headerHeight, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15);
      doc.text("keyboardtesterhub", marginX, 14);
      doc.setFontSize(10);
      doc.text("Keyboard & Mouse Diagnostic Report", marginX, 22);
      doc.setFontSize(9);
      doc.setTextColor(226, 232, 240);
      doc.text("keyboardtesterhub.com", pageWidth - marginX, 11, {
        align: "right",
      });
      doc.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth - marginX, 18, {
        align: "right",
      });
    };

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredHeight: number, currentY: number): number => {
      if (currentY + requiredHeight > pageHeight - marginBottom) {
        addPage();
        return marginTop;
      }
      return currentY;
    };

    // Helper function to draw a section box
    const drawSectionBox = (startY: number, contentHeight: number, title: string) => {
      const boxHeight = contentHeight + 9 + (boxPadding * 2); // Header + content + padding
      const boxY = checkPageBreak(boxHeight, startY);
      
      doc.setDrawColor(229, 231, 235);
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(marginX, boxY, pageWidth - marginX * 2, boxHeight, 2, 2, "FD");
      doc.setFillColor(243, 244, 246);
      doc.rect(marginX, boxY, pageWidth - marginX * 2, 9, "F");
      
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(10);
      doc.text(title, marginX + boxPadding, boxY + 6);
      
      return boxY + 9 + boxPadding;
    };

    // Initial header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, headerHeight, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.text("keyboardtesterhub", marginX, 14);
    doc.setFontSize(10);
    doc.text("Keyboard & Mouse Diagnostic Report", marginX, 22);
    doc.setFontSize(9);
    doc.setTextColor(226, 232, 240);
    doc.text("keyboardtesterhub.com", pageWidth - marginX, 11, {
      align: "right",
    });
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth - marginX, 18, {
      align: "right",
    });

    let y = marginTop;

    // Session Summary Section
    y = checkPageBreak(22, y);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(marginX, y - 4, pageWidth - marginX * 2, 18, 2, 2, "F");
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.text("Session Summary", marginX + 4, y + 1);

    doc.setFontSize(9);
    doc.setTextColor(55, 65, 81);
    const summaryY = y + 7;
    doc.text(`Total key presses: ${totalPresses}`, marginX + 4, summaryY);
    doc.text(
      `Unique keys: ${uniqueCodes.size}`,
      marginX + (pageWidth - marginX * 2) / 3,
      summaryY
    );
    doc.text(
      `Max keys at once: ${maxSimultaneous}`,
      marginX + ((pageWidth - marginX * 2) / 3) * 2,
      summaryY
    );

    if (firstInteractionAt) {
      doc.text(
        `Duration: ${Math.floor(testDurationSeconds / 60)}m ${
          testDurationSeconds % 60
        }s`,
        marginX + 4,
        y + 13
      );
    }

    y += 26 + sectionSpacing;

    // Keyboard Statistics Section
    const allTopKeys = Object.entries(perKeyCounts)
      .sort((a, b) => b[1] - a[1]);
    
    // Calculate content height for keyboard section
    let keyboardContentHeight = (lineHeight * 3) + 2; // Basic stats
    if (allTopKeys.length > 0) {
      keyboardContentHeight += lineHeight; // "Most Pressed Keys:" header
      const keysToShow = Math.min(allTopKeys.length, 25);
      keyboardContentHeight += (lineHeight * keysToShow);
      if (allTopKeys.length > 25) {
        keyboardContentHeight += lineHeight; // "...and X more" line
      }
    }

    let innerY = drawSectionBox(y, keyboardContentHeight, "Keyboard Statistics");
    
    doc.setFontSize(9);
    doc.setTextColor(55, 65, 81);
    doc.text(`Total presses:`, marginX + boxPadding, innerY);
    doc.text(`${totalPresses}`, pageWidth - marginX - boxPadding, innerY, {
      align: "right",
    });
    innerY += lineHeight;
    doc.text(`Max keys at once:`, marginX + boxPadding, innerY);
    doc.text(`${maxSimultaneous}`, pageWidth - marginX - boxPadding, innerY, {
      align: "right",
    });
    innerY += lineHeight;
    doc.text(`Unique keys tested:`, marginX + boxPadding, innerY);
    doc.text(`${uniqueCodes.size}`, pageWidth - marginX - boxPadding, innerY, {
      align: "right",
    });
    innerY += lineHeight + 2;

    // Most pressed keys
    if (allTopKeys.length > 0) {
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(9);
      doc.text("Most Pressed Keys:", marginX + boxPadding, innerY);
      innerY += lineHeight;

      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);
      
      const keysToShow = allTopKeys.slice(0, 25);
      keysToShow.forEach(([code, count]) => {
        innerY = checkPageBreak(lineHeight, innerY);
        const keyText = `${code}: ${count} press${count > 1 ? "es" : ""}`;
        doc.text(keyText, marginX + boxPadding + 4, innerY);
        innerY += lineHeight;
      });

      if (allTopKeys.length > 25) {
        innerY = checkPageBreak(lineHeight, innerY);
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(7);
        doc.text(
          `... and ${allTopKeys.length - 25} more keys`,
          marginX + boxPadding + 4,
          innerY
        );
        innerY += lineHeight;
      }
    }

    // Get the final Y position after keyboard section
    const keyboardBoxStart = y;
    y = innerY + boxPadding + sectionSpacing;

    // Advanced Gaming Tests Section (always show)
    let gamingContentHeight = lineHeight * 2; // Basic header space
    
    // N-key Rollover section (always show, uses maxSimultaneous from general testing)
    gamingContentHeight += lineHeight * 3; // Title + 2 lines
    
    // Gaming Combo Tests section
    if (Object.keys(comboResults).length > 0) {
      gamingContentHeight += lineHeight * 2; // Title + header
      Object.entries(comboResults).forEach(([comboName, result]) => {
        gamingContentHeight += lineHeight * 3; // Combo name + expected + pressed
      });
    } else {
      gamingContentHeight += lineHeight * 2; // Title + "Not performed" message
    }
    
    // Response Time Test section
    if (gamingTotalPresses > 0) {
      gamingContentHeight += lineHeight * 5; // Title + 4 metrics
    } else {
      gamingContentHeight += lineHeight * 2; // Title + "Not performed" message
    }
    
    // Anti-Ghosting Status section (always show, uses maxSimultaneous)
    gamingContentHeight += lineHeight * 3; // Title + status + description

      innerY = drawSectionBox(y, gamingContentHeight, "Advanced Gaming Tests");
      
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      
      // N-Key Rollover Test
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(9);
      doc.text("N-Key Rollover Test:", marginX + boxPadding, innerY);
      innerY += lineHeight;
      
      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);
      doc.text(`Current Keys Pressed: ${pressedKeys.size}`, marginX + boxPadding + 4, innerY);
      innerY += lineHeight;
      doc.text(`Max Simultaneous: ${maxSimultaneous} key${maxSimultaneous !== 1 ? "s" : ""}`, marginX + boxPadding + 4, innerY);
      innerY += lineHeight;
      
      // Status assessment
      let rolloverStatus = "";
      if (maxSimultaneous >= 10) {
        rolloverStatus = "Full N-key rollover detected. Excellent for competitive gaming.";
      } else if (maxSimultaneous >= 6) {
        rolloverStatus = "Supports 6-key rollover. Standard for most keyboards.";
      } else {
        rolloverStatus = "Limited rollover detected. May experience ghosting in complex key combinations.";
      }
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(7);
      const statusLines = doc.splitTextToSize(rolloverStatus, pageWidth - marginX * 2 - boxPadding * 2 - 8);
      statusLines.forEach((line: string) => {
        innerY = checkPageBreak(lineHeight, innerY);
        doc.text(line, marginX + boxPadding + 4, innerY);
        innerY += lineHeight;
      });
      innerY += lineHeight * 0.5;

      // Gaming Combo Tests
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(9);
      innerY = checkPageBreak(lineHeight * 2, innerY);
      doc.text("Gaming Combo Tests:", marginX + boxPadding, innerY);
      innerY += lineHeight;
      
      if (Object.keys(comboResults).length > 0) {
        doc.setFontSize(8);
        Object.entries(comboResults).forEach(([comboName, result]) => {
          innerY = checkPageBreak(lineHeight * 3, innerY);
          doc.setTextColor(55, 65, 81);
          const statusText = result.passed ? "PASSED" : "FAILED";
          doc.text(`${comboName}: ${statusText}`, marginX + boxPadding + 4, innerY);
          innerY += lineHeight;
          
          doc.setTextColor(107, 114, 128);
          doc.setFontSize(7);
          doc.text(`Expected: ${result.expected.join(", ")}`, marginX + boxPadding + 8, innerY);
          innerY += lineHeight;
          doc.text(`Pressed: ${result.keysPressed.length > 0 ? result.keysPressed.join(", ") : "None"}`, marginX + boxPadding + 8, innerY);
          innerY += lineHeight;
        });
      } else {
        doc.setFontSize(8);
        doc.setTextColor(107, 114, 128);
        doc.text("No combo tests performed during this session.", marginX + boxPadding + 4, innerY);
        innerY += lineHeight;
      }
      innerY += lineHeight * 0.5;

      // Response Time Test
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(9);
      innerY = checkPageBreak(lineHeight * 5, innerY);
      doc.text("Response Time Test:", marginX + boxPadding, innerY);
      innerY += lineHeight;
      
      if (gamingTotalPresses > 0) {
        doc.setFontSize(8);
        doc.setTextColor(55, 65, 81);
        doc.text(`Rapid Presses: ${rapidPressCount}`, marginX + boxPadding + 4, innerY);
        innerY += lineHeight;
        doc.text(`Total Presses: ${gamingTotalPresses}`, marginX + boxPadding + 4, innerY);
        innerY += lineHeight;
        
        const avgResponse = rapidPressStartTime && gamingTotalPresses > 0
          ? Math.round((Date.now() - rapidPressStartTime) / gamingTotalPresses)
          : 0;
        doc.text(`Average Response: ${avgResponse}ms`, marginX + boxPadding + 4, innerY);
        innerY += lineHeight;
        
        let responseStatus = "";
        if (rapidPressCount > 50) {
          responseStatus = "Status: Excellent";
        } else if (rapidPressCount > 20) {
          responseStatus = "Status: Good";
        } else if (gamingTotalPresses > 0) {
          responseStatus = "Status: Testing";
        } else {
          responseStatus = "Status: Ready";
        }
        doc.text(responseStatus, marginX + boxPadding + 4, innerY);
      } else {
        doc.setFontSize(8);
        doc.setTextColor(107, 114, 128);
        doc.text("Response time test not performed during this session.", marginX + boxPadding + 4, innerY);
      }
      innerY += lineHeight * 1.5;

      // Anti-Ghosting Status
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(9);
      innerY = checkPageBreak(lineHeight * 3, innerY);
      doc.text("Anti-Ghosting Status:", marginX + boxPadding, innerY);
      innerY += lineHeight;
      
      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);
      const antiGhostingStatus = maxSimultaneous >= 6 ? "Anti-Ghosting: Active" : "Limited Anti-Ghosting";
      doc.text(antiGhostingStatus, marginX + boxPadding + 4, innerY);
      innerY += lineHeight;
      
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(7);
      let antiGhostingDesc = "";
      if (maxSimultaneous >= 10) {
        antiGhostingDesc = "Full N-key rollover detected. Ideal for competitive gaming scenarios.";
      } else if (maxSimultaneous >= 6) {
        antiGhostingDesc = "6-key rollover support. Suitable for most gaming applications.";
      } else {
        antiGhostingDesc = "Limited rollover capability. Complex key combinations may experience ghosting.";
      }
      const descLines = doc.splitTextToSize(antiGhostingDesc, pageWidth - marginX * 2 - boxPadding * 2 - 8);
      descLines.forEach((line: string) => {
        innerY = checkPageBreak(lineHeight, innerY);
        doc.text(line, marginX + boxPadding + 4, innerY);
        innerY += lineHeight;
      });

      y = innerY + boxPadding + sectionSpacing;

    // Mouse Statistics Section
    if (mouseHistory.length > 0) {
      // Calculate content height for mouse section
      let mouseContentHeight = lineHeight + 2; // Total clicks
      mouseContentHeight += lineHeight; // "Click History:" header
      const clicksToShow = Math.min(mouseHistory.length, 20);
      mouseContentHeight += (lineHeight * clicksToShow);
      if (mouseHistory.length > 20) {
        mouseContentHeight += lineHeight; // "...and X more" line
      }

      innerY = drawSectionBox(y, mouseContentHeight, "Mouse Statistics");

      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text(`Total clicks:`, marginX + boxPadding, innerY);
      doc.text(`${mouseHistory.length}`, pageWidth - marginX - boxPadding, innerY, {
        align: "right",
      });
      innerY += lineHeight + 2;

      doc.setTextColor(31, 41, 55);
      doc.setFontSize(9);
      doc.text("Click History:", marginX + boxPadding, innerY);
      innerY += lineHeight;

      doc.setFontSize(8);
      doc.setTextColor(55, 65, 81);
      
      const mouseClicksToShow = mouseHistory.slice(0, 20);
      mouseClicksToShow.forEach((item) => {
        innerY = checkPageBreak(lineHeight, innerY);
        const clickText = `${item.type} click at (${item.x}, ${item.y}) - ${item.timestamp}`;
        const maxWidth = pageWidth - marginX * 2 - boxPadding * 2 - 8;
        doc.text(clickText, marginX + boxPadding + 4, innerY, {
          maxWidth,
        });
        innerY += lineHeight;
      });

      if (mouseHistory.length > 20) {
        innerY = checkPageBreak(lineHeight, innerY);
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(7);
        doc.text(
          `... and ${mouseHistory.length - 20} more clicks`,
          marginX + boxPadding + 4,
          innerY
        );
        innerY += lineHeight;
      }

      y = innerY + boxPadding + sectionSpacing;
    }

    // Key Event History Section
    if (history.length > 0) {
      // Calculate content height - show up to 30 items per page
      const itemsPerPage = Math.floor((pageHeight - marginTop - marginBottom - 30) / lineHeight);
      const totalPagesNeeded = Math.ceil(history.length / itemsPerPage);
      
      for (let page = 0; page < totalPagesNeeded; page++) {
        const startIdx = page * itemsPerPage;
        const endIdx = Math.min(startIdx + itemsPerPage, history.length);
        const pageItems = history.slice(startIdx, endIdx);
        
        const historyContentHeight = (lineHeight * pageItems.length) + 2;
        innerY = drawSectionBox(y, historyContentHeight, 
          page === 0 ? "Key Event History" : `Key Event History (continued)`);

        doc.setFontSize(8);
        doc.setTextColor(55, 65, 81);

        pageItems.forEach((item) => {
          innerY = checkPageBreak(lineHeight, innerY);
          const eventText = `${item.key} (${item.code}) - ${item.timestamp}${item.repeat ? " [REPEAT]" : ""}`;
          const maxWidth = pageWidth - marginX * 2 - boxPadding * 2 - 8;
          doc.text(eventText, marginX + boxPadding, innerY, {
            maxWidth,
          });
          innerY += lineHeight;
        });

        y = innerY + boxPadding + sectionSpacing;
        
        // If there are more pages, add a new page
        if (page < totalPagesNeeded - 1) {
          addPage();
          y = marginTop;
        }
      }
    }

    // Add page numbers to all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(107, 114, 128);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
      doc.text(
        "keyboardtesterhub.com",
        pageWidth - marginX,
        pageHeight - 10,
        { align: "right" }
      );
    }

    doc.save(`keyboard-test-report-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const buildTextSummary = () => {
    const lines: string[] = [];
    lines.push("keyboardtesterhub - Test Report");
    lines.push("=".repeat(40));
    lines.push("");

    if (firstInteractionAt) {
      lines.push(`Test Date: ${firstInteractionAt.toLocaleDateString()}`);
      lines.push(`Test Time: ${firstInteractionAt.toLocaleTimeString()}`);
      lines.push(`Duration: ${Math.floor(testDurationSeconds / 60)}m ${testDurationSeconds % 60}s`);
      lines.push("");
    }

    lines.push("Keyboard summary");
    lines.push(`- Total key presses: ${totalPresses}`);
    lines.push(`- Max keys pressed at once: ${maxSimultaneous}`);
    lines.push(`- Unique keys tested: ${uniqueCodes.size}`);

    const topKeys = Object.entries(perKeyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    if (topKeys.length > 0) {
      lines.push("- Most pressed keys:");
      topKeys.forEach(([code, count]) =>
        lines.push(`  • ${code}: ${count} press(es)`)
      );
    }

    lines.push("");
    lines.push("Mouse summary");
    if (mouseHistory.length === 0) {
      lines.push("- No mouse clicks recorded.");
    } else {
      const limited = mouseHistory.slice(0, 8);
      limited.forEach((item) =>
        lines.push(
          `- ${item.type} click at x=${item.x}, y=${item.y} (${item.timestamp})`
        )
      );
    }

    return lines.join("\n");
  };

  const handleShareReport = async () => {
    const summary = buildTextSummary();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Keyboard & Mouse Test Report",
          text: summary,
        });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(summary);
        // eslint-disable-next-line no-alert
        alert("Report summary copied to clipboard.");
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="space-y-8">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="howto-jsonld"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="space-y-4">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Free Online{" "}
          <span className="whitespace-nowrap text-zinc-950 dark:text-zinc-50">
            Keyboard Tester & Key Rollover Test
          </span>
          </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          Test your keyboard's <span className="font-medium text-zinc-800 dark:text-zinc-200">key rollover</span>, N-key rollover, and anti-ghosting capabilities instantly. Press any key and watch it light up in real time. keyboardtesterhub helps you quickly find{" "}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            dead, stuck, or repeating keys
          </span>{" "}
          on any keyboard — perfect for gaming keyboards and mechanical keyboards. No downloads required, works right in your browser.
        </p>
      </section>

      {/* SEO Content Section - Key Rollover Test */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl">
          What is Key Rollover Test?
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            A <strong className="font-semibold text-zinc-900 dark:text-zinc-100">key rollover test</strong> checks how many keys your keyboard can register simultaneously. This is crucial for gaming, where you often need to press multiple keys at once (like W+A+S+D+Space+Shift). Professional typists and programmers also benefit from keyboards with high rollover capabilities.
          </p>
          <p>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">N-key rollover (NKRO)</strong> means your keyboard can register all keys pressed at the same time. Most gaming keyboards support at least 6-key rollover, while premium models offer full N-key rollover. Standard office keyboards typically support only 2-3 key rollover, which can cause issues when typing quickly or gaming.
          </p>
          <p>
            Use our free <strong className="font-semibold text-zinc-900 dark:text-zinc-100">key rollover tester</strong> to test your keyboard's capabilities. Simply press multiple keys simultaneously and see which ones register. This helps identify if your keyboard supports the key combinations you need for gaming or professional work. Our tool works with mechanical keyboards, membrane keyboards, and laptop keyboards.
          </p>
        </div>
      </section>

      {/* SEO Content Section - Anti-Ghosting */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl">
          Understanding Anti-Ghosting and Keyboard Ghosting
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Keyboard ghosting</strong> occurs when pressing certain key combinations causes unwanted key presses to register. This happens because keyboards use a matrix circuit, and some combinations can create electrical conflicts. Anti-ghosting technology prevents these false key presses.
          </p>
          <p>
            Gaming keyboards typically feature <strong className="font-semibold text-zinc-900 dark:text-zinc-100">full anti-ghosting</strong>, meaning all keys can be pressed simultaneously without conflicts. Standard keyboards may only have anti-ghosting for specific key combinations, usually around the WASD area for gaming.
          </p>
          <p>
            Test your keyboard's anti-ghosting capabilities using our online keyboard tester. Try pressing complex combinations like W+A+S+D+Space+Shift+Ctrl. If all keys register correctly, your keyboard has good anti-ghosting. If some keys don't register or false keys appear, your keyboard may have ghosting issues.
          </p>
        </div>
      </section>

      {/* SEO Content Section - Gaming Keyboard Testing */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl">
          Why Test Your Gaming Keyboard?
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            Gaming keyboards require <strong className="font-semibold text-zinc-900 dark:text-zinc-100">high-performance features</strong> like N-key rollover, anti-ghosting, and fast response times. A keyboard that fails during intense gaming sessions can cost you matches and affect your performance.
          </p>
          <p>
            Before purchasing a new gaming keyboard or troubleshooting issues with your current one, use our keyboard tester to verify:
          </p>
          <ul className="list-inside list-disc space-y-2 ml-2">
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Key rollover capabilities</strong> - Can it handle complex key combinations?</li>
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Anti-ghosting performance</strong> - Do all keys register correctly when pressed together?</li>
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Individual key functionality</strong> - Are all keys working properly?</li>
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Response time</strong> - How quickly does the keyboard register key presses?</li>
          </ul>
          <p>
            Our free online keyboard tester works with all keyboard types including mechanical keyboards, membrane keyboards, RGB gaming keyboards, and wireless keyboards. No software installation required - test directly in your web browser.
          </p>
        </div>
      </section>

      {/* Additional SEO Content - Keyboard Testing Benefits */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl">
          Free Online Keyboard Tester - No Installation Required
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            Our <strong className="font-semibold text-zinc-900 dark:text-zinc-100">free keyboard tester</strong> is the easiest way to check if your keyboard is working correctly. Whether you're testing a new keyboard, diagnosing issues with an existing one, or performing a <a href="/blog/how-to-properly-test-a-keyboard" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">keyboard health check</a>, our tool provides instant feedback.
          </p>
          <p>
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Key features of our keyboard tester:</strong>
          </p>
          <ul className="list-inside list-disc space-y-2 ml-2">
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Real-time key detection</strong> - See which keys are pressed instantly on the virtual keyboard</li>
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Key rollover test</strong> - Test how many keys your keyboard can register simultaneously</li>
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Anti-ghosting verification</strong> - Check if your keyboard prevents unwanted key presses</li>
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Stuck key detection</strong> - Identify keys that don't release properly</li>
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Comprehensive testing</strong> - Test all 104+ keys including function keys, modifiers, and special keys</li>
            <li><strong className="font-semibold text-zinc-900 dark:text-zinc-100">Works on all devices</strong> - Compatible with Windows, Mac, Linux, and mobile devices</li>
          </ul>
          <p>
            Perfect for <a href="/blog/best-mechanical-keyboards-gaming-2025" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">gaming keyboards</a>, <a href="/blog/membrane-vs-mechanical-keyboards" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">mechanical keyboards</a>, and all keyboard types. Start testing your keyboard now - no signup or download required.
          </p>
        </div>
      </section>

      <section className="grid gap-3 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-3 sm:text-sm">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 shadow-sm sm:px-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 sm:text-xs">
            Total key presses
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
            {totalPresses}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 shadow-sm sm:px-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 sm:text-xs">
            Max keys at once
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
            {maxSimultaneous}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 shadow-sm sm:px-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 sm:text-xs">
            Keys tested
          </p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
            {uniqueCodes.size} / 104
          </p>
        </div>
      </section>

      <section className="grid gap-4 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-2 sm:text-sm">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
          <h2 className="mb-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            How to use keyboardtesterhub
          </h2>
          <ol className="space-y-2 text-xs sm:text-sm">
            <li className="flex gap-2">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">1.</span>
              <span>
                Simply start pressing keys on your physical keyboard. Each key
                will light up on the virtual keyboard in real-time.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">2.</span>
              <span>
                Test all keys systematically: letters, numbers, function keys,
                modifiers, and special keys.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">3.</span>
              <span>
                Perform a <strong>key rollover test</strong> by holding multiple keys simultaneously (like WASD + Space + Shift) to test anti-ghosting and N-key rollover capabilities.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">4.</span>
              <span>
                Check for stuck keys by releasing all keys and seeing if any
                remain highlighted.
              </span>
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
          <h2 className="mb-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Recent key activity
          </h2>
          {history.length === 0 ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
              Start typing to see a live log of your key presses here.
            </p>
          ) : (
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 sm:text-[13px]">
              {history.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`${item.code}-${index}`} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="rounded-md bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 text-[11px] font-medium text-zinc-800 dark:text-zinc-200">
                      {item.key}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {item.code}
                    </span>
                  </span>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    {item.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-2 grid gap-4 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm">
          <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Diagnose stuck keys
          </h3>
          <p>
            If a key doesn&apos;t release visually after you stop pressing it,
            that&apos;s a sign of a{" "}
            <span className="font-medium">stuck or failing switch</span>. Learn more about <a href="/faq" className="text-emerald-600 dark:text-emerald-400 hover:underline">keyboard troubleshooting</a>.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm">
          <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Check gaming anti-ghosting
          </h3>
          <p>
            Hold down your usual gaming combo (for example,{" "}
            <span className="font-mono text-[11px]">W + A + Space</span>) and
            confirm every key lights up correctly. Perfect for <a href="/blog/how-to-properly-test-a-keyboard" className="text-emerald-600 dark:text-emerald-400 hover:underline">testing gaming keyboards</a>.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm">
          <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Browser-based & private
          </h3>
          <p>
            All testing happens locally in your browser. No data is sent to
            servers, ensuring complete privacy and security. Read our <a href="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">privacy policy</a> for details.
          </p>
        </div>
      </section>

      {/* Advanced Gaming Tests Section */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-base">
              Advanced Gaming Tests
            </h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
              Test anti-ghosting, N-key rollover, response time, and gaming combos
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const wasActive = gamingTestActive;
              setGamingTestActive(!wasActive);
              if (wasActive) {
                // Stopping test - clear results
                setSelectedCombo(null);
                setRapidPressCount(0);
                setGamingTotalPresses(0);
                setRapidPressStartTime(null);
                lastKeyPressTimeRef.current = null;
                processedKeyEventRef.current = null;
              } else {
                // Starting test - reset counters
                setRapidPressCount(0);
                setGamingTotalPresses(0);
                setRapidPressStartTime(null);
                lastKeyPressTimeRef.current = null;
                processedKeyEventRef.current = null;
                setKeyPressTimings({});
              }
            }}
            className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
              gamingTestActive
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            }`}
          >
            {gamingTestActive ? "Stop Testing" : "Start Gaming Tests"}
          </button>
        </div>

        {gamingTestActive && (
          <div className="space-y-4">
            {/* N-Key Rollover Test */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                N-Key Rollover Test
              </h3>
              <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                Press multiple keys simultaneously to test rollover capability. Current maximum:{" "}
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{maxSimultaneous} keys</span>.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg bg-white dark:bg-zinc-800 p-3">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Current Keys Pressed</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {pressedKeys.size} key{pressedKeys.size !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex-1 rounded-lg bg-white dark:bg-zinc-800 p-3">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Max Simultaneous</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {maxSimultaneous} key{maxSimultaneous !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                {maxSimultaneous >= 10 ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>Full N-key rollover detected. Excellent for competitive gaming.</span>
                  </>
                ) : maxSimultaneous >= 6 ? (
                  <>
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                    <span>Supports 6-key rollover. Standard for most keyboards.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <span>Limited rollover detected. May experience ghosting in complex key combinations.</span>
                  </>
                )}
              </div>
            </div>

            {/* Gaming Combo Tests */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Gaming Combo Tests
              </h3>
              <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                Select a combo and hold all keys simultaneously. Verify all keys register correctly.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {Object.keys(gamingCombos).map((comboName) => {
                  const result = comboResults[comboName];
                  const isSelected = selectedCombo === comboName;
                  const isPassed = result?.passed;
                  
                  return (
                    <button
                      key={comboName}
                      type="button"
                      onClick={() => setSelectedCombo(comboName)}
                      className={`rounded-lg border p-2 text-xs font-medium transition-colors ${
                        isSelected
                          ? "border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate">{comboName}</span>
                        {isPassed !== undefined && (
                          isPassed ? (
                            <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                          ) : (
                            <X className="h-4 w-4 shrink-0 text-red-600" />
                          )
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedCombo && comboResults[selectedCombo] && (
                <div className="mt-3 rounded-lg bg-white dark:bg-zinc-800 p-3 text-xs">
                  <div className="flex items-start gap-2">
                    {comboResults[selectedCombo].passed ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-emerald-700 dark:text-emerald-400">All keys registered correctly</p>
                          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                            Expected: {comboResults[selectedCombo].expected.join(", ")}
                          </p>
                          <p className="text-zinc-600 dark:text-zinc-400">
                            Pressed: {comboResults[selectedCombo].keysPressed.join(", ") || "None"}
          </p>
        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-red-700 dark:text-red-400">
                            {comboResults[selectedCombo].keysPressed.length === 0
                              ? "Press the keys simultaneously to test"
                              : "Some keys failed to register"}
                          </p>
                          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                            Expected: {comboResults[selectedCombo].expected.join(", ")}
                          </p>
                          <p className="text-zinc-600 dark:text-zinc-400">
                            Pressed: {comboResults[selectedCombo].keysPressed.length > 0
                              ? comboResults[selectedCombo].keysPressed.join(", ")
                              : "None (hold all keys at once)"}
                          </p>
                          {comboResults[selectedCombo].keysPressed.length > 0 && (
                            <p className="mt-1 text-xs text-amber-600">
                              Missing: {comboResults[selectedCombo].expected
                                .filter((key) => !comboResults[selectedCombo].keysPressed.includes(key))
                                .join(", ")}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Response Time Test */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Response Time Test
              </h3>
              <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                Press keys rapidly to measure response time. Lower latency improves gaming performance.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-lg bg-white dark:bg-zinc-800 p-3">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Rapid Presses</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{rapidPressCount}</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-zinc-800 p-3">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Presses</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{gamingTotalPresses}</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-zinc-800 p-3">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Avg Response</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {rapidPressStartTime && gamingTotalPresses > 0
                      ? `${Math.round((Date.now() - rapidPressStartTime) / gamingTotalPresses)}ms`
                      : "—"}
                  </p>
                </div>
                <div className="rounded-lg bg-white dark:bg-zinc-800 p-3">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    {rapidPressCount > 50 ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Excellent</span>
                      </>
                    ) : rapidPressCount > 20 ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Good</span>
                      </>
                    ) : gamingTotalPresses > 0 ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Testing</span>
                      </>
                    ) : (
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Ready</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Anti-Ghosting Indicator */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Anti-Ghosting Status
              </h3>
              <div className="flex items-center gap-3">
                <div className={`flex-1 rounded-lg p-3 ${
                  maxSimultaneous >= 6
                    ? "bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
                    : "bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800"
                }`}>
                  <div className="flex items-start gap-2">
                    {maxSimultaneous >= 6 ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {maxSimultaneous >= 6
                          ? "Anti-Ghosting: Active"
                          : "Limited Anti-Ghosting"}
                      </p>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {maxSimultaneous >= 10
                          ? "Full N-key rollover detected. Ideal for competitive gaming scenarios."
                          : maxSimultaneous >= 6
                            ? "6-key rollover support. Suitable for most gaming applications."
                            : "Limited rollover capability. Complex key combinations may experience ghosting."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!gamingTestActive && (
          <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900/50 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Enable gaming tests to evaluate N-key rollover, anti-ghosting, response time, and combo validation.
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
              These tests help determine if your keyboard meets competitive gaming requirements.
            </p>
          </div>
        )}
      </section>

      <AdSlot position="top" />

      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Keyboard visualizer
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setKeyboardLayout(keyboardLayout === "ANSI" ? "ISO" : "ANSI")}
                className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-600 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700 sm:text-xs"
                aria-label={`Switch to ${keyboardLayout === "ANSI" ? "ISO" : "ANSI"} layout`}
              >
                {keyboardLayout}
              </button>
              <button
                type="button"
                onClick={() => setShowNumpad(!showNumpad)}
                className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[10px] font-medium text-zinc-600 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700 sm:text-xs"
                aria-label={showNumpad ? "Hide numpad" : "Show numpad"}
              >
                <span className="hidden sm:inline">{showNumpad ? "Hide" : "Show"} Numpad</span>
                <span className="sm:hidden">Num</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[10px] font-medium text-zinc-600 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700 sm:text-xs"
                aria-label="Reset all test data"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                Live · Listening to key presses
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/50 p-3 text-center text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
            This tester listens to your whole keyboard. Just{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              start pressing keys
            </span>{" "}
            and they&apos;ll light up. Try holding multiple keys to check
            anti-ghosting.
          </div>

          <div className="space-y-2 rounded-xl bg-zinc-900 dark:bg-zinc-950 px-3 py-3 text-xs text-zinc-200 dark:text-zinc-300 sm:px-4 sm:py-4 sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-100 dark:text-zinc-200">Current key</span>
              {currentlyPressed.length > 0 ? (
                <span className="text-[11px] text-emerald-400 dark:text-emerald-500 sm:text-xs">
                  {currentlyPressed.length} key
                  {currentlyPressed.length > 1 ? "s" : ""} pressed
                </span>
              ) : (
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 sm:text-xs">
                  Waiting for input…
                </span>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 rounded-lg bg-zinc-800/80 dark:bg-zinc-900/80 px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold tracking-tight dark:text-zinc-100 sm:text-2xl">
                  {lastEvent?.key || "—"}
                </span>
                {lastEvent?.code && (
                  <span className="rounded-full bg-zinc-900 dark:bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                    {lastEvent.code}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end text-[10px] text-zinc-400 dark:text-zinc-500">
                <span>
                  Location:{" "}
                  <span className="font-medium text-zinc-100 dark:text-zinc-200">
                    {lastEvent ? lastEvent.location : "—"}
                  </span>
                </span>
                <span>
                  Time:{" "}
                  <span className="font-medium text-zinc-100 dark:text-zinc-200">
                    {lastEvent?.timestamp || "—"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <Keyboard layout={keyboardLayout} showNumpad={showNumpad} />
          </div>
        </div>
      </section>

      <AdSlot position="bottom" />

      <section className="mt-4 grid gap-4 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] sm:text-sm">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
          <h2 className="mb-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Advanced statistics
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 sm:text-xs">
                Unique keys tested
              </span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {uniqueCodes.size} / 104
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 sm:text-xs">
                Max simultaneous
              </span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {maxSimultaneous} key{maxSimultaneous !== 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
              This shows your keyboard&apos;s{" "}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                anti-ghosting / N-key rollover
              </span>{" "}
              performance.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-5">
          <h2 className="mb-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Most pressed keys
          </h2>
          {Object.keys(perKeyCounts).length === 0 ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
              Start testing and the top keys you use will appear here as a mini
              heatmap.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {Object.entries(perKeyCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
                .map(([code, count]) => (
                  <li
                    key={code}
                    className="flex items-center justify-between text-[11px] sm:text-xs"
                  >
                    <span className="flex items-center gap-2">
                      <span className="inline-flex min-w-[60px] items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 font-mono text-[11px] text-zinc-800 dark:text-zinc-200">
                        {code}
                      </span>
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {count} press{count > 1 ? "es" : ""}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 shadow-sm sm:p-6">
        <h2 className="mb-3 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Mouse tester
        </h2>
        <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-900/50 p-4 text-center text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
          <div
            className="min-h-[120px] rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-4"
            onClick={(event) => {
              event.preventDefault();
              const info: MouseEventInfo = {
                type: "left",
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY,
                timestamp: new Date().toLocaleTimeString(),
              };
              setLastMouseEvent(info);
              setMouseHistory((prev) => [info, ...prev].slice(0, 10));
            }}
            onAuxClick={(event) => {
              event.preventDefault();
              const info: MouseEventInfo = {
                type: "middle",
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY,
                timestamp: new Date().toLocaleTimeString(),
              };
              setLastMouseEvent(info);
              setMouseHistory((prev) => [info, ...prev].slice(0, 10));
            }}
            onContextMenu={(event) => {
              event.preventDefault();
              const info: MouseEventInfo = {
                type: "right",
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY,
                timestamp: new Date().toLocaleTimeString(),
              };
              setLastMouseEvent(info);
              setMouseHistory((prev) => [info, ...prev].slice(0, 10));
            }}
          >
            {lastMouseEvent ? (
              <div className="space-y-1 text-center">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                  Last click:{" "}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {lastMouseEvent.type} button
                  </span>
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 sm:text-xs">
                  Position:{" "}
                  <span className="font-mono text-[11px] sm:text-xs">
                    x={lastMouseEvent.x}, y={lastMouseEvent.y}
                  </span>{" "}
                  · Time: {lastMouseEvent.timestamp}
                </p>
              </div>
            ) : (
              <span className="text-zinc-600 dark:text-zinc-400">Click anywhere in this area to start testing your mouse.</span>
            )}
          </div>
          {mouseHistory.length > 0 && (
            <div className="mt-3 text-left">
              <p className="mb-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 sm:text-xs">
                Click history ({mouseHistory.length})
              </p>
              <ul className="space-y-1 text-[10px] text-zinc-500 dark:text-zinc-400 sm:text-[11px]">
                {mouseHistory.slice(0, 5).map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index} className="flex items-center justify-between">
                    <span>
                      {item.type} click at ({item.x}, {item.y})
                    </span>
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                      {item.timestamp}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setIsReportOpen(true)}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700 sm:text-sm"
        >
          View detailed report
        </button>
      </section>

      {isReportOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsReportOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Keyboard & Mouse Test Report
              </h2>
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className="rounded-lg p-1 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-300"
                aria-label="Close report"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                  Session summary
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Total presses:</span>{" "}
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {totalPresses}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Unique keys:</span>{" "}
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {uniqueCodes.size}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">Max at once:</span>{" "}
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {maxSimultaneous}
                    </span>
                  </div>
                  {firstInteractionAt && (
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400">Duration:</span>{" "}
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {Math.floor(testDurationSeconds / 60)}m{" "}
                        {testDurationSeconds % 60}s
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {Object.keys(perKeyCounts).length > 0 && (
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                    Most pressed keys
                  </h3>
                  <ul className="space-y-1 text-xs">
                    {Object.entries(perKeyCounts)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 8)
                      .map(([code, count]) => (
                        <li
                          key={code}
                          className="flex items-center justify-between"
                        >
                          <span className="font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                            {code}
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400">
                            {count} press{count > 1 ? "es" : ""}
                          </span>
                        </li>
                      ))}
                  </ul>
        </div>
              )}

              {mouseHistory.length > 0 && (
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                    Mouse activity
                  </h3>
                  <ul className="space-y-1 text-xs">
                    {mouseHistory.slice(0, 8).map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <li key={index} className="flex items-center justify-between">
                        <span>
                          {item.type} click at ({item.x}, {item.y})
                        </span>
                        <span className="text-zinc-400 dark:text-zinc-500">{item.timestamp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="rounded-lg bg-zinc-900 dark:bg-zinc-700 px-4 py-2 text-xs font-medium text-white dark:text-zinc-100 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-600 sm:text-sm"
              >
                Download PDF report
              </button>
              <button
                type="button"
                onClick={handleShareReport}
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700 sm:text-sm"
              >
                Share / copy summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
