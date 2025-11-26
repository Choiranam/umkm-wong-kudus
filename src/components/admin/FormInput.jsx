import React from "react";

export default function FormInput({
  label,
  required,
  fullWidth,
  small,
  children,
  className,
}) {
  return (
    <div className={`${fullWidth ? "md:col-span-2" : ""} ${className || ""}`}>
      <label
        className={`block ${
          small
            ? "text-xs text-gray-500 uppercase tracking-wide"
            : "text-sm text-gray-700"
        } font-medium mb-1.5 ml-0.5`}
      >
        {label}
        {required && (
          <span className="text-red-500 text-sm leading-none ml-0.5">*</span>
        )}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}
