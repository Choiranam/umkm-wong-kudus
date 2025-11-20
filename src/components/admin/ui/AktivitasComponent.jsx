import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import api from "../../../services/api";
import Toast from "../Toast";

const API_ACTIVITIES = "/activities";

export default function AktivitasComponent() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "success" });
  };

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ACTIVITIES);
      if (res.data.status && Array.isArray(res.data.data)) {
        setActivities(res.data.data);
      } else {
        setActivities([]);
      }
    } catch (err) {
      showToast("Gagal memuat aktivitas", "error");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case "create":
        return "mdi:plus-circle";
      case "update":
        return "mdi:file-edit";
      case "delete":
        return "mdi:trash-can";
      case "rating":
        return "mdi:star";
      case "contact":
        return "mdi:email";
      default:
        return "mdi:information";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "create":
        return "text-emerald-600 bg-emerald-100 ring-emerald-50";
      case "update":
        return "text-blue-600 bg-blue-100 ring-blue-50";
      case "delete":
        return "text-red-600 bg-red-100 ring-red-50";
      case "rating":
        return "text-amber-600 bg-amber-100 ring-amber-50";
      case "contact":
        return "text-purple-600 bg-purple-100 ring-purple-50";
      default:
        return "text-gray-600 bg-gray-100 ring-gray-50";
    }
  };

  const getActorBadge = (actor) => {
    const map = {
      admin: { text: "Admin", color: "bg-gray-900 text-white" },
      user: { text: "User", color: "bg-indigo-600 text-white" },
      guest: { text: "Guest", color: "bg-gray-400 text-white" },
    };
    return map[actor?.toLowerCase()] || map.guest;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;

    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Log Aktivitas
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Memantau semua tindakan sistem secara real-time
              </p>
            </div>

            <button
              onClick={fetchActivities}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition whitespace-nowrap disabled:opacity-50 shadow-sm"
            >
              <Icon
                icon="mdi:refresh"
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
              Refresh Data
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
          </div>
        ) : activities.length > 0 ? (
          <div className="relative border-l-2 border-gray-200 ml-5 space-y-8 pb-10">
            {activities.map((act) => {
              const badge = getActorBadge(act.actor);
              const styles = getTypeColor(act.type);
              const icon = getTypeIcon(act.type);

              return (
                <div key={act.id} className="relative pl-8 group">
                  <div
                    className={`absolute -left-[1.1rem] top-0 p-1.5 rounded-full ring-4 ring-white bg-white z-10`}
                  >
                    <div className={`p-1.5 rounded-full ${styles}`}>
                      <Icon icon={icon} className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 mt-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${badge.color}`}
                      >
                        {badge.text}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {formatDate(act.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-gray-300">
                    <h3 className="text-gray-800 font-semibold text-base leading-snug">
                      {act.activity}
                    </h3>

                    {act.related_table && (
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded border border-gray-200 font-medium capitalize flex items-center gap-1">
                          <Icon
                            icon="mdi:database-outline"
                            className="w-3.5 h-3.5"
                          />
                          {act.related_table.replace(/_/g, " ")}
                        </span>
                        {act.related_id && (
                          <span className="text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">
                            ID: {act.related_id}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-center shadow-sm">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Icon
                icon="mdi:clipboard-text-clock-outline"
                className="w-12 h-12 text-gray-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Belum Ada Aktivitas
            </h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
              Sistem belum mencatat aktivitas apapun. Log aktivitas akan muncul
              di sini secara otomatis.
            </p>
            <button
              onClick={fetchActivities}
              className="mt-6 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
