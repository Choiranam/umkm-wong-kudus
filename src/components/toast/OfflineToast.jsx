import { useEffect } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

const OfflineToast = () => {
  useEffect(() => {
    const showToast = () => {
      if (!navigator.onLine) {
        toast(
          (t) => (
            <div className="flex items-center gap-3 bg-orange-100 border border-orange-300 rounded-lg shadow-lg p-4 max-w-sm animate-fade-in">
              <Icon icon="mdi:wifi-off" className="text-orange-500 text-2xl" />
              <div>
                <p className="font-semibold text-orange-900">
                  Jaringan Terputus!
                </p>
                <p className="text-sm text-orange-700">
                  Periksa koneksi internet Anda.
                </p>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="ml-auto text-orange-500 hover:text-orange-700"
              >
                <Icon icon="mdi:close" className="text-xl" />
              </button>
            </div>
          ),
          {
            position: window.innerWidth >= 768 ? "bottom-left" : "top-center",
            duration: Infinity,
            id: "offline-toast",
          }
        );
      } else {
        toast.dismiss("offline-toast");
      }
    };

    showToast();

    window.addEventListener("online", showToast);
    window.addEventListener("offline", showToast);

    return () => {
      window.removeEventListener("online", showToast);
      window.removeEventListener("offline", showToast);
    };
  }, []);

  return null;
};

export default OfflineToast;
