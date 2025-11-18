import React from "react";
import { Icon } from "@iconify/react";

export default function Toast({ message, type, onClose }) {
  const icon = type === "success" ? "mdi:check-circle" : "mdi:alert-circle";
  const colors =
    type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white";

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-out">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${colors}`}
      >
        <Icon icon={icon} className="w-5 h-5" />
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2">
          <Icon icon="mdi:close" className="w-4 h-4" />
        </button>
      </div>
      <style jsx>{`
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          10%,
          90% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
