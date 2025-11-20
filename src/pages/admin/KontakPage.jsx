import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Layout from "../../components/admin/layout/Layout";
import { FaSync, FaFileExcel } from "react-icons/fa";
import api from "../../services/api.js";
import * as XLSX from "xlsx";
import Toast from "../../components/admin/Toast";
import Pagination from "../../components/admin/Pagination";
import DeleteModal from "../../components/admin/DeleteModal"; // TAMBAHAN

export default function KontakAdminPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("unread");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // TAMBAHAN
  const [contactToDelete, setContactToDelete] = useState(null); // TAMBAHAN

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

  // GANTI DARI LANGSUNG DELETE KE MODAL
  const openDeleteModal = (id) => {
    setContactToDelete(id);
    setDeleteModalOpen(true);
  };

  const deleteContact = async () => {
    if (!contactToDelete) return;
    try {
      const res = await api.delete(`${API_URL}/${contactToDelete}`);
      if (res.data.status) {
        showToast("Pesan dinonaktifkan", "success");
        setDeleteModalOpen(false);
        setContactToDelete(null);
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

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">

            {/* Toast */}
            {toast.show && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
              />
            )}

            {/* HEADER CARD */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col gap-6">
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

                {/* TAB */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {[
                    { key: "unread", label: "Belum Dibaca", count: contacts.filter(c => c.status === "active").length, color: "bg-orange-500" },
                    { key: "read", label: "Sudah Dibaca", count: contacts.filter(c => c.status === "read").length, color: "bg-emerald-500" },
                    { key: "inactive", label: "Nonaktif", count: contacts.filter(c => c.status === "inactive").length, color: "bg-gray-500" },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
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
                <table className="w-full text-sm table-fixed">
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
                          <td className="px-6 py-4 text-gray-600 max-w-[180px] truncate">{item.sender_email}</td>
                          <td className="px-6 py-4 text-gray-600">{item.no_telepon || "-"}</td>
                          <td className="px-6 py-4 max-w-[220px] truncate">
                            <p className="text-gray-700 truncate" title={item.message}>
                              {item.message}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500 max-w-[150px] truncate">
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
                                <button onClick={() => openDeleteModal(item.id)} className="text-red-600 hover:text-red-800 transition">
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

                {/* HANYA PAGINATION — TEKS "Menampilkan 1-5 dari..." DIHAPUS */}
                {data.length > itemsPerPage && (
                  <div className="px-6 py-4 border-t bg-gray-50">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* MODAL DETAIL — TETAP CANTIK 100% SAMA */}
            {selectedMessage && (
              <div
                className="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedMessage(null)}
              >
                <div
                  className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-3xl h-[92vh] flex flex-col overflow-hidden animate-[slideUp_0.3s_ease-out]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* HEADER, BODY, FOOTER — TETAP SAMA PERSIS */}
                  <div className="shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br via-white opacity-50"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative p-8 pb-6 flex justify-between items-start text-left">
                      <div className="text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-1">
                          Detail Pesan Pengguna
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Informasi lengkap pesan masuk
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="w-11 h-11 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition shadow-lg border border-gray-200 hover:scale-110 transform"
                      >
                        <Icon icon="mdi:close" className="w-6 h-6 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 pt-2 pb-10">
                    {/* PROFILE */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                          {selectedMessage.sender_name.charAt(0)}
                        </div>
                        <div className="text-left">
                          <p className="text-xl font-bold text-gray-900 mb-1">
                            {selectedMessage.sender_name} {selectedMessage.sender_name_last || ""}
                          </p>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Icon icon="mdi:email-outline" className="w-4 h-4" />
                            {selectedMessage.sender_email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="bg-gradient-to-br rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                      <div className="flex flex-col text-left">
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2 mb-2">
                          <Icon icon="mdi:email-mark-as-unread" className="w-5 h-5 text-orange-500" />
                          Status Pesan
                        </p>
                        <span
                          className={`inline-block w-fit px-5 py-2 rounded-full text-sm font-bold
                            ${selectedMessage.status === "active" ? "bg-orange-100 text-orange-700" :
                              selectedMessage.status === "read" ? "bg-emerald-100 text-emerald-700" :
                              "bg-gray-100 text-gray-600"
                            }`}
                        >
                          {selectedMessage.status === "active" ? "Belum Dibaca" :
                           selectedMessage.status === "read" ? "Dibaca" : "Nonaktif"}
                        </span>
                      </div>
                    </div>

                    {/* INFORMASI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                        <p className="text-xs font-bold text-blue-600 uppercase mb-1">Email</p>
                        <p className="text-gray-900 font-medium">{selectedMessage.sender_email}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                        <p className="text-xs font-bold text-green-600 uppercase mb-1">No. Telepon</p>
                        <p className="text-gray-900 font-medium">{selectedMessage.no_telepon || "-"}</p>
                      </div>
                    </div>

                    {/* PESAN */}
                    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-left gap-2 mb-3">
                        <Icon icon="mdi:message" className="w-5 h-5 text-orange-500" />
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pesan Lengkap</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-left">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>

                    {/* WAKTU */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm mt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon icon="mdi:clock-outline" className="w-5 h-5 text-orange-500" />
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Dikirim Pada</p>
                      </div>
                      <p className="text-gray-800 font-medium text-base text-left">
                        {new Date(selectedMessage.created_at).toLocaleString("id-ID", {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 p-8 pt-6 border-t bg-gradient-to-b from-gray-50 to-white rounded-b-3xl flex justify-end items-center">
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* DELETE MODAL — PAKAI COMPONENT! */}
            <DeleteModal
              isOpen={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={deleteContact}
              title="Nonaktifkan Pesan"
              message="Apakah Anda yakin ingin menonaktifkan pesan ini? Pesan akan masuk ke tab Nonaktif."
              confirmText="Nonaktifkan"
              confirmColor="bg-red-600 hover:bg-red-700"
            />
          </div>
        </main>
      </div>
    </Layout>
  );
}