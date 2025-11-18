import React from "react";

export default function InfoSection({ title, children, className = "" }) {
  return (
    <section className={className}>
      <h4 className="text-lg font-semibold mb-2 text-gray-800 border-b pb-1 border-gray-200">
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
