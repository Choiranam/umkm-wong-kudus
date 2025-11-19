import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Layout from "../../components/admin/layout/Layout";
import { FaSync, FaFileExcel, FaTimes } from "react-icons/fa";
import api from "../../services/api.js";
import * as XLSX from "xlsx";
import Toast from "../../components/admin/Toast";
import Pagination from "../../components/admin/Pagination";

export default function KontakAdminPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("unread");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const itemsPerPage = 5;
  const API_URL = "/contact";

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get(API_URL);
      if (res.data.status) {
        setContacts(res.data.data);
      }
    } catch (err) {
      showToast("Gagal memuat pesan", "error");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await api.put(`${API_URL}/read/${id}`);
      if (res.data.status) {
        showToast("Pesan ditandai sebagai dibaca", "success");
        fetchContacts();
        setActiveTab("read");
      }
    } catch (err) {
      showToast("Gagal menandai pesan", "error");
    }
  };

  const markAsInactive = async (id) => {
    try {
      const res = await api.delete(`${API_URL}/${id}`);
      if (res.data.status) {
        showToast("Pesan dinonaktifkan", "success");
        fetchContacts();
      }
    } catch (err) {
      showToast("Gagal menonaktifkan pesan", "error");
    }
  };

  const exportToExcel = (data, filename) => {
    const exportData = data.map((item) => ({
      "Nama Depan": item.sender_name,
      "Nama Belakang": item.sender_name_last || "",
      Email: item.sender_email,
      "No. Telepon": item.no_telepon || "-",
      Pesan: item.message,
      Status:
        item.status === "active" ? "Belum Dibaca" :
        item.status === "read" ? "Dibaca" : "Nonaktif",
      Waktu: new Date(item.created_at).toLocaleString("id-ID"),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kontak");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    showToast(`Berhasil export ${filename}`, "success");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter berdasarkan tab
  const getFilteredData = () => {
    if (activeTab === "unread") return contacts.filter(c => c.status === "active");
    if (activeTab === "read") return contacts.filter(c => c.status === "read");
    return contacts.filter(c => c.status === "inactive");
  };

  const data = getFilteredData();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const startItem = data.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, data.length);

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">

            {/* Toast */}
            {toast.show && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
              />
            )}

            {/* HEADER CARD — TAB SUDAH DIPINDAH KE SINI! */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col gap-6">
                {/* Judul + Tombol */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kotak Masuk Kontak</h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Total: <span className="font-bold">{contacts.length}</span> pesan | 
                      Menampilkan: <span className="font-bold">{data.length}</span> data
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => exportToExcel(data, `Kontak_${activeTab === "unread" ? "Belum_Dibaca" : activeTab === "read" ? "Sudah_Dibaca" : "Nonaktif"}`)}
                      className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
                    >
                      <FaFileExcel className="w-5 h-5" />
                      Export Excel
                    </button>
                    <button
                      onClick={fetchContacts}
                      disabled={loading}
                      className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition font-medium shadow-sm"
                    >
                      {loading ? "Memuat..." : <><FaSync className="w-5 h-5" /> Refresh</>}
                    </button>
                  </div>
                </div>

                {/* TAB STATUS — SEKARANG DI HEADER! */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {[
                    { key: "unread", label: "Belum Dibaca", count: contacts.filter(c => c.status === "active").length, color: "bg-orange-500" },
                    { key: "read", label: "Sudah Dibaca", count: contacts.filter(c => c.status === "read").length, color: "bg-emerald-500" },
                    { key: "inactive", label: "Nonaktif", count: contacts.filter(c => c.status === "inactive").length, color: "bg-gray-500" },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key);
                        setCurrentPage(1);
                      }}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 shadow-md ${
                        activeTab === tab.key
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`px-3 py-1 rounded-full text-white font-bold text-xs ${tab.color}`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Table */}
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengirim</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Telepon</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pesan</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-center text-gray-700 font-medium">
                            {startItem + idx}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">
                              {item.sender_name} {item.sender_name_last || ""}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{item.sender_email}</td>
                          <td className="px-6 py-4 text-gray-600">{item.no_telepon || "-"}</td>
                          <td className="px-6 py-4 max-w-md">
                            <p className="text-gray-700 truncate" title={item.message}>
                              {item.message}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                            {new Date(item.created_at).toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-4">
                              <button onClick={() => setSelectedMessage(item)} className="text-blue-600 hover:text-blue-800 transition">
                                <Icon icon="mdi:eye" className="w-5 h-5" />
                              </button>
                              {activeTab === "unread" && (
                                <button onClick={() => markAsRead(item.id)} className="text-emerald-600 hover:text-emerald-800 transition">
                                  <Icon icon="mdi:check-bold" className="w-5 h-5" />
                                </button>
                              )}
                              {activeTab !== "inactive" && (
                                <button onClick={() => markAsInactive(item.id)} className="text-red-600 hover:text-red-800 transition">
                                  <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-16 text-center text-gray-500 italic">
                          Tidak ada pesan di tab ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination Info */}
                {data.length > 0 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t bg-gray-50 text-sm text-gray-600">
                    <div className="mb-3 sm:mb-0">
                      Menampilkan <span className="font-bold">{startItem}</span>-
                      <span className="font-bold">{endItem}</span> dari{" "}
                      <span className="font-bold">{data.length}</span> data
                    </div>
                    {data.length > itemsPerPage && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* MODAL DETAIL — TETAP CANTIK GILA */}
            {selectedMessage && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMessage(null)}>
                <div
                  className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                          {selectedMessage.sender_name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {selectedMessage.sender_name} {selectedMessage.sender_name_last || ""}
                          </h3>
                          <p className="text-sm text-gray-500">Pengirim Pesan</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="mb-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                        selectedMessage.status === "active" ? "bg-orange-100 text-orange-700" :
                        selectedMessage.status === "read" ? "bg-emerald-100 text-emerald-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {selectedMessage.status === "active" ? "Belum Dibaca" :
                         selectedMessage.status === "read" ? "Dibaca" : "Nonaktif"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <p className="text-xs font-bold text-blue-600 uppercase">Email</p>
                        <p className="text-gray-900 font-medium">{selectedMessage.sender_email}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <p className="text-xs font-bold text-green-600 uppercase">No. Telepon</p>
                        <p className="text-gray-900 font-medium">{selectedMessage.no_telepon || "-"}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border">
                      <p className="text-xs font-bold text-gray-600 uppercase mb-3">Pesan Lengkap</p>
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>

                    <div className="mt-6 text-sm text-gray-500 flex justify-between">
                      <span>{new Date(selectedMessage.created_at).toLocaleString("id-ID")}</span>
                      <span className="text-gray-400">ID: #{selectedMessage.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}