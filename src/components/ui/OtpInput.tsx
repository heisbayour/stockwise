// =============================================================
// STOCKWISE — OTP Input Component
// File: src/components/ui/OtpInput.tsx
//
// 6 separate boxes for entering a verification code.
// Auto-advances to next box as user types, supports paste.
// Usage: <OtpInput value={code} onChange={setCode} />
// =============================================================

"use client";

import { useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";

interface OtpInputProps {
  value: string; // the full code as a string, e.g. "482910"
  onChange: (value: string) => void;
  length?: number; // defaults to 6 digits
}

export default function OtpInput({ value, onChange, length = 6 }: OtpInputProps) {
  // One ref per box so we can programmatically focus the next/previous box
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Convert the string value into an array of individual characters,
  // padding with empty strings so we always render `length` boxes
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  function handleChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // only allow digits
    if (!inputValue) return;

    const newDigits = [...digits];
    newDigits[index] = inputValue.slice(-1); // only keep the last typed character
    onChange(newDigits.join(""));

    // Move focus to the next box automatically
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    // Backspace on an empty box moves focus back to the previous box
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    onChange(pasted);
    // Focus the last filled box after pasting
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-14 text-center text-xl font-semibold rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      ))}
    </div>
  );
}
