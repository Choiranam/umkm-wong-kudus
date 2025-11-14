import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCheckCircle, MdError, MdClose } from "react-icons/md";

const NetworkToast = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  const showToast = (type) => {
    toast.dismiss("network-toast");

    const isDesktop = window.innerWidth >= 768;

    toast.custom(
      (t) => (
        <div
          className={`z-50 w-full sm:w-80 md:w-96 max-w-md flex items-start gap-3 
          p-3 sm:p-4 rounded-xl shadow-xl border-l-4
          ${
            type === "offline"
              ? "border-red-500 bg-red-50"
              : "border-green-500 bg-green-50"
          }
          ${
            t.visible
              ? isDesktop
                ? "animate-slide-in-left"
                : "animate-slide-in-top"
              : isDesktop
              ? "animate-slide-out-left"
              : "animate-slide-out-top"
          }
          ${
            isDesktop
              ? "fixed bottom-4 left-4"
              : "fixed top-4 left-1/2 -translate-x-1/2"
          }
        `}
        >
          {type === "offline" ? (
            <MdError className="text-xl sm:text-2xl shrink-0 mt-0.5 text-red-600" />
          ) : (
            <MdCheckCircle className="text-xl sm:text-2xl shrink-0 mt-0.5 text-green-600" />
          )}

          <span className="flex-1 text-sm sm:text-base pr-8 leading-snug text-gray-900">
            {type === "offline"
              ? "Jaringan Terputus! Periksa koneksi internet Anda."
              : "Koneksi Kembali! Internet tersambung lagi."}
          </span>

          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            onClick={() => toast.dismiss(t.id)}
          >
            <MdClose className="text-base sm:text-lg" />
          </button>
        </div>
      ),
      {
        id: "network-toast",
        duration: type === "offline" ? Infinity : 3000,
      }
    );
  };

  const updateStatus = (offline) => {
    if (offline !== isOffline) {
      if (offline) {
        setWasOffline(true);
        showToast("offline");
      } else if (wasOffline) {
        showToast("online");
        setWasOffline(false);
      }

      setIsOffline(offline);
    }
  };

  useEffect(() => {
    const handleStatusChange = () => {
      updateStatus(!navigator.onLine);
    };

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOffline, wasOffline]);

  return null;
};

export default NetworkToast;
