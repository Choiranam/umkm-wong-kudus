import React, { useState, useEffect } from "react";
import Layout from "../../components/admin/layout/Layout";
import {
  RefreshCw,
  Download,
  Settings,
  Tag,
  Store,
  MapPin,
  MessageCircle,
  User,
  Plus, // <-- TAMBAHAN
  Pencil, // <-- TAMBAHAN
  Trash2, // <-- TAMBAHAN
} from "lucide-react";
import api from "../../services/api"; // sesuaikan path ke file api.js kamu
import AuthService from "../../services/authService"; // sesuaikan path

// Kunci untuk localStorage
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

  // --- State untuk Reminder ---
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [editingId, setEditingId] = useState(null);
  // --- Akhir State Reminder ---

  const endpoints = [
    "https://api-umkmwongkudus.rplrus.com/api/categories/total",
    "https://api-umkmwongkudus.rplrus.com/api/umkm/total",
    "https://api-umkmwongkudus.rplrus.com/api/kecamatan/total",
    "https://api-umkmwongkudus.rplrus.com/api/blog-category/total",
    "https://api-umkmwongkudus.rplrus.com/api/blog/total",
    "https://api-umkmwongkudus.rplrus.com/api/contact-umkm/total",
    "https://api-umkmwongkudus.rplrus.com/api/rating/total",
  ];

  // Fetch statistik utama (tanpa auth)
  const fetchStats = async () => {
    // ... (kode fetchStats Anda tetap sama)
    try {
      const res = await Promise.all(
        endpoints.map((url) =>
          fetch(url)
            .then((r) => r.json())
            .catch(() => null)
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
    } catch (e) {
      console.error("Error fetch stats:", e);
    }
  };

  // Fetch data tim admin → PAKAI BEARER TOKEN
  const fetchAdminTeam = async () => {
    // ... (kode fetchAdminTeam Anda tetap sama)
    try {
      setLoadingTeam(true);
      const response = await api.get("/users/all");
      if (
        response.data &&
        response.data.status &&
        Array.isArray(response.data.data)
      ) {
        setAdminTeam(response.data.data);
      } else {
        setAdminTeam([]);
      }
    } catch (err) {
      console.error(
        "Gagal mengambil data admin:",
        err.response?.data || err.message
      );
      setAdminTeam([]);
    } finally {
      setLoadingTeam(false);
    }
  };

  // Refresh semua data
  const fetchAllData = () => {
    fetchStats();
    fetchAdminTeam();
  };

  useEffect(() => {
    // Cek autentikasi & set token (jika belum)
    if (AuthService.isAuthenticated()) {
      fetchAllData();
    } else {
      // Optional: redirect ke login jika belum login
      // window.location.href = "/login";
    }

    // -- TAMBAHAN: Muat reminders dari localStorage saat komponen mount --
    const storedReminders = localStorage.getItem(REMINDERS_KEY);
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  }, []);

  // -- TAMBAHAN: Simpan reminders ke localStorage setiap kali 'reminders' berubah --
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

  // --- FUNGSI CRUD UNTUK REMINDER ---

  const handleShowForm = (reminder = null) => {
    if (reminder) {
      // Mode Edit
      setEditingId(reminder.id);
      setCurrentText(reminder.text);
    } else {
      // Mode Tambah
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
    if (!currentText.trim()) return; // Jangan simpan jika kosong

    if (editingId) {
      // Update (Edit)
      setReminders(
        reminders.map((r) =>
          r.id === editingId ? { ...r, text: currentText } : r
        )
      );
    } else {
      // Create (Tambah)
      const newReminder = {
        id: Date.now(), // ID unik sederhana
        text: currentText,
      };
      setReminders([...reminders, newReminder]);
    }
    handleCancel(); // Reset form
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus reminder ini?")) {
      setReminders(reminders.filter((r) => r.id !== id));
    }
  };

  // --- AKHIR FUNGSI CRUD REMINDER ---

  return (
    <Layout>
      {/* Perbaikan layout anti-scroll dari sebelumnya */}
      <div className="h-screen bg-gray-50/70 p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
          {/* Header */}
          <div className="bg-linear-to-r from-orange-500 to-amber-600 px-5 py-4">
            {/* ... (kode header Anda tetap sama) ... */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Dashboard Admin
                </h1>
                <p className="text-orange-100 text-sm">
                  UMKM Wong Kudus – Live Statistics
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchAllData}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-xs font-medium border border-white/30 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Data
                </button>
                <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-xs font-medium border border-white/30 transition">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-xs font-medium border border-white/30 transition">
                  <Settings className="w-4 h-4" />
                  Pengaturan
                </button>
              </div>
            </div>
          </div>

          {/* Konten dengan scroll internal */}
          <div className="p-4 md:p-5 overflow-y-auto flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              {/* ... (kode stat cards Anda tetap sama) ... */}
              <div className="bg-linear-to-br from-orange-500 to-amber-600 rounded-xl p-4 text-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-orange-100 text-xs">Kategori</p>
                    <p className="text-3xl font-bold">{data.kategori}</p>
                  </div>
                  <Tag className="w-7 h-7 opacity-80" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-xs">UMKM</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {data.umkm}
                    </p>
                  </div>
                  <Store className="w-7 h-7 text-orange-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-xs">Kecamatan</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {data.kecamatan}
                    </p>
                  </div>
                  <MapPin className="w-7 h-7 text-orange-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-xs">Pesan Masuk</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {data.pesan}
                    </p>
                  </div>
                  <MessageCircle className="w-7 h-7 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left: Chart + Reminder */}
              <div className="lg:col-span-2 space-y-5">
                {/* Chart (sudah diperbaiki) */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    Statistik Sistem
                  </h3>
                  <div className="flex items-end justify-around h-44 gap-2">
                    {chartData.map((value, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="relative w-full mb-2 h-36">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-orange-600 to-amber-500 rounded-t-md transition-all duration-1000 ease-out"
                            style={{
                              height: `${(value / maxValue) * 100}%`,
                              minHeight: value > 0 ? "8px" : "0px",
                            }}
                          />
                          <div className="absolute inset-x-0 -top-6 text-xs font-semibold text-gray-700 text-center">
                            {value}
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">
                          {labels[i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* === BLOK REMINDER YANG DIMODIFIKASI === */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Reminder Hari Ini
                    </h3>
                    {!showForm && (
                      <button
                        onClick={() => handleShowForm()}
                        className="flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-md transition"
                      >
                        <Plus className="w-3 h-3" />
                        Tambah
                      </button>
                    )}
                  </div>

                  {/* Form Tambah/Edit */}
                  {showForm && (
                    <form onSubmit={handleSubmit} className="mb-3 space-y-2">
                      <input
                        type="text"
                        value={currentText}
                        onChange={(e) => setCurrentText(e.target.value)}
                        placeholder={
                          editingId
                            ? "Edit reminder..."
                            : "Tulis reminder baru..."
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="text-xs bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md"
                        >
                          {editingId ? "Simpan" : "Tambah"}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Daftar Reminders */}
                  <div className="space-y-2">
                    {reminders.length > 0
                      ? reminders.map((reminder) => (
                          <div
                            key={reminder.id}
                            className="flex justify-between items-center bg-orange-50 border border-orange-100 text-orange-800 rounded-lg p-3 text-sm"
                          >
                            <p className="flex-1 wrap-break-word">
                              {reminder.text}
                            </p>
                            <div className="flex gap-2 ml-2 shrink-0">
                              <button
                                onClick={() => handleShowForm(reminder)}
                                className="text-orange-600 hover:text-orange-800"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(reminder.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      : !showForm && (
                          <p className="text-xs text-gray-500 text-center py-2">
                            Tidak ada reminder hari ini.
                          </p>
                        )}
                  </div>
                </div>
                {/* === AKHIR BLOK REMINDER === */}
              </div>

              {/* Right: Tim Admin + Progress */}
              <div className="space-y-5">
                {/* TIM ADMIN */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  {/* ... (kode Tim Admin Anda tetap sama) ... */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Tim Admin
                    </h3>
                    {loadingTeam && (
                      <span className="text-xs text-gray-500">memuat...</span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {adminTeam.length > 0 ? (
                      adminTeam.map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                          {user.foto_profil ? (
                            <img
                              src={user.foto_profil}
                              alt={user.name}
                              className="w-9 h-9 rounded-full object-cover shadow"
                              onError={(e) => {
                                e.target.src = "";
                                e.target.style.display = "none";
                                e.target.nextElementSibling.style.display =
                                  "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-9 h-9 bg-gradient- h-0.5to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow ${
                              user.foto_profil ? "hidden" : "flex"
                            }`}
                          >
                            {user.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {user.name || "Tanpa Nama"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            Online
                          </span>
                        </div>
                      ))
                    ) : !loadingTeam ? (
                      <p className="text-xs text-gray-500 text-center py-4">
                        Tidak ada data admin
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Progress Bulan Ini */}
                <div className="bg-linear-to-br from-orange-500 to-amber-600 rounded-xl p-5 text-white text-center">
                  {/* ... (kode Progress Anda tetap sama) ... */}
                  <h3 className="text-sm font-semibold mb-3">
                    Progress Bulan Ini
                  </h3>
                  <div className="relative w-28 h-28 mx-auto">
                    <svg viewBox="0 0 120 120" className="-rotate-90">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#991b1b"
                        strokeWidth="14"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="white"
                        strokeWidth="14"
                        fill="none"
                        strokeDasharray="314"
                        strokeDashoffset={314 - 314 * 0.78}
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
        </div>
      </div>
    </Layout>
  );
}
