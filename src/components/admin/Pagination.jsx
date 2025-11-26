import React from "react";
import { Icon } from "@iconify/react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
      <button
        onClick={() => onPageChange((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 flex items-center gap-1"
      >
        <Icon icon="mdi:chevron-left" /> Previous
      </button>
      <div className="flex gap-1">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i + 1
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100 flex items-center gap-1"
      >
        Next <Icon icon="mdi:chevron-right" />
      </button>
    </div>
  );
}
