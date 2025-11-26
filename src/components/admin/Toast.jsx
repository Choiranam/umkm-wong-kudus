import React from "react";
import { Icon } from "@iconify/react";

export default function Toast({ message, type = "success", onClose }) {
  const config = {
    success: {
      icon: "mdi:check-circle",
      color: "bg-green-600 text-white",
    },
    warning: {
      icon: "mdi:alert",
      color: "bg-yellow-500 text-black",
    },
    error: {  
      icon: "mdi:alert-circle",
      color: "bg-red-600 text-white",
    },
  };

  const { icon, color } = config[type] || config.success;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in-out">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${color}`}
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
            transform: translateY(10px);
          }
          10%,
          90% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
