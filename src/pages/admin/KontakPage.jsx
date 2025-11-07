import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/admin/layout/Layout";
import { FaEye, FaTrash, FaSync, FaFileExcel, FaTimes } from "react-icons/fa";
import api from "../../API/auth.js";
import * as XLSX from "xlsx";

export default function KontakAdminPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState({ all: false, unread: false, read: false, inactive: false });
  const [activeTab, setActiveTab] = useState("unread");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [toastTarget, setToastTarget] = useState("");
  const [currentPage, setCurrentPage] = useState({ unread: 1, read: 1, inactive: 1 });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const modalRef = useRef(null);

  const itemsPerPage = 5;
  const API_URL = "/contact";

  const showToastMessage = (msg, type = "success", target = "") => {
    setToastMessage(msg);
    setToastType(type);
    setToastTarget(target);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastTarget("");
    }, 3000);
  };

  const fetchContacts = async (tab = null) => {
    const key = tab || "all";
    setLoading(prev => ({ ...prev, [key]: true }));
    try {
      const res = await api.get(API_URL);
      if (res.data.status) {
        setContacts(res.data.data);
      }
    } catch (err) {
      showToastMessage("Gagal memuat pesan", "error");
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await api.put(`${API_URL}/read/${id}`);
      if (res.data.status) {
        showToastMessage("Pesan ditandai sebagai dibaca", "success", "read");
        fetchContacts("unread");
      }
    } catch (err) {
      showToastMessage("Gagal menandai pesan", "error");
    }
  };

  const markAsInactive = async (id) => {
    try {
      const res = await api.delete(`${API_URL}/${id}`);
      if (res.data.status) {
        showToastMessage("Pesan dinonaktifkan", "success", "inactive");
        fetchContacts(activeTab === "unread" ? "unread" : activeTab === "read" ? "read" : "inactive");
      }
    } catch (err) {
      showToastMessage("Gagal menonaktifkan pesan", "error");
    }
  };

  const exportToExcel = (data, filename) => {
    const exportData = data.map(item => ({
      "Nama Depan": item.sender_name,
      "Nama Belakang": item.sender_name_last,
      "Email": item.sender_email,
      "No. Telepon": item.no_telepon,
      "Pesan": item.message,
      "Status": item.status === "active" ? "Belum Dibaca" : item.status === "read" ? "Dibaca" : "Nonaktif",
      "Waktu": new Date(item.created_at).toLocaleString("id-ID")
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kontak");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    showToastMessage(`Berhasil export ${filename}`, "success");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (toastTarget) {
      setActiveTab(toastTarget);
    }
  }, [toastTarget]);

  const unread = contacts.filter(c => c.status === "active");
  const read = contacts.filter(c => c.status === "read");
  const inactive = contacts.filter(c => c.status === "inactive");

  const getPaginated = (data, pageKey) => {
    const start = (currentPage[pageKey] - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageKey, page) => {
    const data = pageKey === "unread" ? unread : pageKey === "read" ? read : inactive;
    if (page >= 1 && page <= totalPages(data)) {
      setCurrentPage(prev => ({ ...prev, [pageKey]: page }));
    }
  };

  const openDetail = (item) => {
    setSelectedMessage(item);
  };

  const closeDetail = () => {
    setSelectedMessage(null);
  };

  const TableContent = ({ data, pageKey, emptyMsg, showRead, showInactive, tabName }) => {
    const currentData = getPaginated(data, pageKey);
    const pages = totalPages(data);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <div className="flex justify-end p-3 border-b">
          <button
            onClick={() => exportToExcel(data, `Kontak_${tabName}`)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
          >
            <FaFileExcel className="w-4 h-4" />
            Export Excel
          </button>
        </div>

        <table className="w-full min-w-max text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">No</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pengirim</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">No. Telepon</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pesan</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Waktu</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.length > 0 ? (
              currentData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center text-gray-700 font-medium">
                    {(currentPage[pageKey] - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <p className="font-medium text-gray-900">{item.sender_name} {item.sender_name_last}</p>
                  </td>
                  <td className="px-6 py-3 text-center text-gray-600">{item.sender_email}</td>
                  <td className="px-6 py-3 text-center text-gray-600">{item.no_telepon}</td>
                  <td className="px-6 py-3 text-center max-w-xs">
                    <p className="text-gray-700 truncate block" title={item.message}>
                      {item.message}
                    </p>
                  </td>
                  <td className="px-6 py-3 text-center text-xs text-gray-500 whitespace-nowrap">
                    {new Date(item.created_at).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openDetail(item)}
                        className="text-blue-600 hover:text-blue-700 transition"
                        title="Lihat Detail"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      {showRead && (
                        <button
                          onClick={() => markAsRead(item.id)}
                          className="text-orange hover:text-orange-dark transition"
                          title="Tandai Dibaca"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                      )}
                      {showInactive && (
                        <button
                          onClick={() => markAsInactive(item.id)}
                          className="text-red-600 hover:text-red-700 transition"
                          title="Nonaktifkan"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center text-gray-500 italic">
                  {emptyMsg}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {data.length > itemsPerPage && (
          <div className="flex justify-center items-center p-4 border-t text-sm text-gray-600 space-x-2">
            <span>
              Menampilkan {(currentPage[pageKey] - 1) * itemsPerPage + 1}-
              {Math.min(currentPage[pageKey] * itemsPerPage, data.length)} dari {data.length}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => handlePageChange(pageKey, currentPage[pageKey] - 1)}
                disabled={currentPage[pageKey] === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
              >
                Prev
              </button>
              {[...Array(pages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(pageKey, i + 1)}
                  className={`px-3 py-1 border rounded transition ${
                    currentPage[pageKey] === i + 1 ? "bg-orange text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pageKey, currentPage[pageKey] + 1)}
                disabled={currentPage[pageKey] === pages}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            {/* TOAST */}
            {showToast && (
              <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out z-50 text-sm font-medium ${
                toastType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  toastType === "success" ? "bg-green-600" : "bg-red-600"
                }`}>
                  {toastType === "success" ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span>
                  {toastMessage}
                  {toastTarget && (
                    <button
                      onClick={() => setActiveTab(toastTarget)}
                      className="ml-2 underline hover:no-underline font-semibold"
                    >
                      Lihat di {toastTarget === "read" ? "Dibaca" : "Nonaktif"}
                    </button>
                  )}
                </span>
              </div>
            )}

            {/* HEADER (KIRI) */}
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-gray-800">Kotak Masuk Kontak</h1>
            </div>

            {/* TABS (CENTER) */}
            <div className="flex justify-center gap-3 mb-5 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("unread")}
                className={`px-5 py-2 font-medium text-sm border-b-2 transition rounded-t-lg ${
                  activeTab === "unread"
                    ? "border-orange text-orange bg-orange-50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Belum Dibaca
                <span className="ml-2 bg-orange text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {unread.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("read")}
                className={`px-5 py-2 font-medium text-sm border-b-2 transition rounded-t-lg ${
                  activeTab === "read"
                    ? "border-orange text-orange bg-orange-50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Sudah Dibaca
                <span className="ml-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {read.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("inactive")}
                className={`px-5 py-2 font-medium text-sm border-b-2 transition rounded-t-lg ${
                  activeTab === "inactive"
                    ? "border-orange text-orange bg-orange-50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Nonaktif
                <span className="ml-2 bg-gray-400 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {inactive.length}
                </span>
              </button>
            </div>

            {/* REFRESH (CENTER) */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => fetchContacts(activeTab)}
                disabled={loading[activeTab]}
                className="flex items-center gap-2 bg-orange text-white px-5 py-2 rounded-full hover:bg-orange-dark transition text-sm font-medium shadow-sm"
              >
                {loading[activeTab] ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memuat...
                  </>
                ) : (
                  <>
                    <FaSync className="w-4 h-4" />
                    Refresh {activeTab === "unread" ? "Belum Dibaca" : activeTab === "read" ? "Dibaca" : "Nonaktif"}
                  </>
                )}
              </button>
            </div>

            {/* TABLE */}
            {loading[activeTab] ? (
              <div className="flex justify-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange"></div>
              </div>
            ) : (
              <>
                {activeTab === "unread" && (
                  <TableContent
                    data={unread}
                    pageKey="unread"
                    emptyMsg="Tidak ada pesan baru"
                    showRead={true}
                    showInactive={true}
                    tabName="Belum_Dibaca"
                  />
                )}
                {activeTab === "read" && (
                  <TableContent
                    data={read}
                    pageKey="read"
                    emptyMsg="Belum ada pesan yang dibaca"
                    showRead={false}
                    showInactive={true}
                    tabName="Sudah_Dibaca"
                  />
                )}
                {activeTab === "inactive" && (
                  <TableContent
                    data={inactive}
                    pageKey="inactive"
                    emptyMsg="Belum ada pesan yang dinonaktifkan"
                    showRead={false}
                    showInactive={false}
                    tabName="Nonaktif"
                  />
                )}
              </>
            )}
          </div>
        </main>

        {/* DETAIL MODAL – JOSJIS MODERN */}
        {selectedMessage && (
          <div 
            className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50 p-4 "
            onClick={closeDetail}
          >
            <div
              ref={modalRef}
              className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 hover:scale-[1.005]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400  rounded-2xl blur opacity-30"></div>
              
              <div className="relative bg-white rounded-2xl p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full p-0.5">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-2xl font-bold text-orange-600">
                          {selectedMessage.sender_name.charAt(0)}
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedMessage.sender_name} {selectedMessage.sender_name_last}
                      </h3>
                      <p className="text-sm text-gray-500">Pengirim Pesan</p>
                    </div>
                  </div>
                  <button 
                    onClick={closeDetail} 
                    className="text-gray-400 hover:text-gray-600 transition transform hover:scale-110"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedMessage.status === "active" 
                      ? "bg-orange-100 text-orange-700 border border-orange-300" :
                    selectedMessage.status === "read" 
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-300" :
                      "bg-gray-100 text-gray-600 border border-gray-300"
                  }`}>
                    {selectedMessage.status === "active" ? (
                      <>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        Belum Dibaca
                      </>
                    ) : selectedMessage.status === "read" ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" />
                        </svg>
                        Dibaca
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        Nonaktif
                      </>
                    )}
                  </span>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Email */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Email</p>
                        <p className="text-sm text-gray-900 mt-1 font-medium">{selectedMessage.sender_email}</p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedMessage.sender_email);
                          showToastMessage("Email disalin ke clipboard!", "success");
                        }}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Salin Email"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">No. Telepon</p>
                        <p className="text-sm text-gray-900 mt-1 font-medium">{selectedMessage.no_telepon || "-"}</p>
                      </div>
                      {selectedMessage.no_telepon && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedMessage.no_telepon);
                            showToastMessage("No. Telepon disalin!", "success");
                          }}
                          className="text-green-600 hover:text-green-800 transition"
                          title="Salin No. Telepon"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Card */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Pesan Lengkap</p>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date(selectedMessage.created_at).toLocaleString("id-ID", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    ID: #{selectedMessage.id}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0; }
            10%, 90% { opacity: 1; }
          }
          .animate-fade-in-out { animation: fadeInOut 3s ease-in-out; }
        `}</style>
      </div>
    </Layout>
  );
}