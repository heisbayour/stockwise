// =============================================================
// STOCKWISE — Input Component
// File: src/components/ui/Input.tsx
//
// Reusable text input with label + error message support.
// Usage: <Input label="Email" type="email" error={errors.email} {...register} />
// =============================================================

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string; // small helper text below the input, shown only when no error
}

// forwardRef lets parent forms grab a ref to the actual <input> DOM node
// (needed for some form libraries, and for autofocus etc.)
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...rest }, ref) => {
    // Use the id if given, otherwise derive one from the label for accessibility
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
            ${error ? "border-red-400" : "border-gray-300"}
            ${className}`}
          {...rest}
        />

        {/* Show error if present, otherwise show hint if present */}
        {error ? (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
