import React from "react";

export default function FormInput({
  label,
  required,
  fullWidth,
  small,
  children,
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label
        className={`block ${
          small ? "text-xs" : "text-sm"
        } font-medium text-gray-700 mb-1`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
