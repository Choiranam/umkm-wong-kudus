import React, { useState, useEffect } from "react";
import Layout from "../../components/admin/layout/Layout";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import Toast from "../../components/admin/Toast";

const REMINDERS_KEY = "dashboardReminders";

export default function Dashboard() {
  const [data, setData] = useState({
    kategori: 0,
    umkm: 0,
    kecamatan: 0,
    kategoriBlog: 0,
    artikel: 0,
    pesan: 0,
    rating: 0,
  });

  const [adminTeam, setAdminTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
  };

  const hideToast = () =>
    setToast({ show: false, message: "", type: "success" });

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const endpoints = [
        "/categories/total",
        "/umkm/total",
        "/kecamatan/total",
        "/blog-category/total",
        "/blog/total",
        "/contact-umkm/total",
        "/rating/total",
      ];

      const res = await Promise.all(
        endpoints.map((ep) =>
          api
            .get(ep)
            .then((r) => r.data)
            .catch(() => ({}))
        )
      );

      setData({
        kategori: res[0]?.total_categories || 0,
        umkm: res[1]?.total_umkm || 0,
        kecamatan: res[2]?.total_kecamatan || 0,
        kategoriBlog: res[3]?.total_category_blogs || 0,
        artikel: res[4]?.total_articles || 0,
        pesan: res[5]?.total_contact_umkm || 0,
        rating: res[6]?.total_rating || 0,
      });
    } catch {
      showToast("Gagal memuat statistik", "error");
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchAdminTeam = async () => {
    try {
      setLoadingTeam(true);
      const res = await api.get("/users/all");
      if (res.data.status && Array.isArray(res.data.data)) {
        setAdminTeam(res.data.data);
      } else {
        setAdminTeam([]);
      }
    } catch {
      setAdminTeam([]);
    } finally {
      setLoadingTeam(false);
    }
  };

  const fetchAll = () => {
    fetchStats();
    fetchAdminTeam();
  };

  useEffect(() => {
    fetchAll();
    const saved = localStorage.getItem(REMINDERS_KEY);
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  }, [reminders]);

  const chartData = [
    data.kategori,
    data.umkm,
    data.kecamatan,
    data.kategoriBlog,
    data.artikel,
    data.pesan,
    data.rating,
  ];
  const maxValue = Math.max(...chartData, 1);
  const labels = [
    "Kategori",
    "UMKM",
    "Kecamatan",
    "Kat. Blog",
    "Artikel",
    "Pesan",
    "Rating",
  ];

  const handleShowForm = (reminder = null) => {
    if (reminder) {
      setEditingId(reminder.id);
      setCurrentText(reminder.text);
    } else {
      setEditingId(null);
      setCurrentText("");
    }
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setCurrentText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentText.trim()) return;

    if (editingId) {
      setReminders(
        reminders.map((r) =>
          r.id === editingId ? { ...r, text: currentText } : r
        )
      );
    } else {
      setReminders([...reminders, { id: Date.now(), text: currentText }]);
    }
    handleCancel();
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus reminder ini?")) {
      setReminders(reminders.filter((r) => r.id !== id));
    }
  };

  return (
    <Layout>
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-bold text-gray-800 text-left">
                Dashboard Admin
              </h1>
              <p className="text-sm text-gray-600 text-left">
                UMKM Wong Kudus – Live Statistics
              </p>
            </div>
            <button
              onClick={fetchAll}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition"
            >
              <Icon icon="mdi:refresh" className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {[
            {
              icon: "mdi:tag-outline",
              label: "Kategori",
              value: data.kategori,
            },
            {
              icon: "mdi:store-outline",
              label: "UMKM",
              value: data.umkm,
            },
            {
              icon: "mdi:map-marker-outline",
              label: "Kecamatan",
              value: data.kecamatan,
            },
            {
              icon: "mdi:message-outline",
              label: "Pesan Masuk",
              value: data.pesan,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
        group bg-white border border-gray-200 rounded-2xl shadow-sm
        p-5 transition-all duration-300 flex flex-col items-start text-left
        hover:bg-linear-to-br hover:from-orange-500 hover:to-amber-600
        hover:border-transparent hover:shadow-md
      "
            >
              <Icon
                icon={item.icon}
                className="
          w-9 h-9 mb-2 text-orange-600 transition-all duration-300
          group-hover:text-white
        "
              />

              <p
                className="
          text-sm text-gray-600 transition-all duration-300
          group-hover:text-white/90
        "
              >
                {item.label}
              </p>

              <p
                className="
          text-2xl font-bold text-gray-900 transition-all duration-300
          group-hover:text-white
        "
              >
                {loadingStats ? "—" : item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-10">
                Statistik Sistem
              </h3>
              <div className="grid grid-cols-7 gap-3">
                {chartData.map((value, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative w-full h-36">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-orange-600 to-amber-500 rounded-t-xl transition-all duration-1000"
                        style={{
                          height: `${(value / maxValue) * 100}%`,
                          minHeight: value > 0 ? "10px" : "0px",
                        }}
                      />
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-700">
                        {value}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">
                      {labels[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Reminder Hari Ini
                </h3>
                {!showForm && (
                  <button
                    onClick={() => handleShowForm()}
                    className="flex items-center gap-2 text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    <Icon icon="mdi:plus" className="w-5 h-5" />
                    Tambah
                  </button>
                )}
              </div>

              {showForm && (
                <form onSubmit={handleSubmit} className="mb-4 space-y-3">
                  <input
                    type="text"
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    placeholder={
                      editingId ? "Edit reminder..." : "Tulis reminder baru..."
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    autoFocus
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
                    >
                      {editingId ? "Simpan" : "Tambah"}
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {reminders.length > 0
                  ? reminders.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl p-4"
                      >
                        <p className="text-sm text-orange-900 flex-1 pr-4">
                          {r.text}
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleShowForm(r)}
                            className="text-orange-600 hover:text-orange-800"
                          >
                            <Icon icon="mdi:pencil" className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Icon
                              icon="mdi:trash-can-outline"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </div>
                    ))
                  : !showForm && (
                      <p className="text-center text-gray-500 py-6 text-sm">
                        Belum ada reminder hari ini.
                      </p>
                    )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Tim Admin</h3>
                {loadingTeam && (
                  <span className="text-sm text-gray-500">memuat...</span>
                )}
              </div>
              <div className="space-y-4">
                {adminTeam.length > 0
                  ? adminTeam.map((user) => (
                      <div key={user.id} className="flex items-center gap-4">
                        {user.foto_profil ? (
                          <img
                            src={user.foto_profil}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover shadow"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow">
                            {user.name?.[0].toUpperCase() || "?"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {user.name || "Tanpa Nama"}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                          Online
                        </span>
                      </div>
                    ))
                  : !loadingTeam && (
                      <p className="text-center text-gray-500 py-6 text-sm">
                        Tidak ada data admin
                      </p>
                    )}
              </div>
            </div>

            <div className="bg-linear-to-br from-orange-500 to-amber-600 rounded-2xl p-7 text-white text-center shadow-lg">
              <h3 className="text-lg font-bold mb-5">Progress Bulan Ini</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg viewBox="0 0 128 128" className="-rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#fdba74"
                    strokeWidth="14"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="white"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="352"
                    strokeDashoffset={352 - 352 * 0.78}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-3xl font-black">78%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
