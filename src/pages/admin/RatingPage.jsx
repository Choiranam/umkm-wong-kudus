import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/admin/layout/Layout";
import {
  FaEye,
  FaTrash,
  FaSync,
  FaFileExcel,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import api from "../../services/api.js";
import * as XLSX from "xlsx";

export default function RatingAdminPage() {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(null);
  const modalRef = useRef(null);

  const itemsPerPage = 5;
  const API_URL = "/rating";

  const showToastMessage = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const [ratingsRes, avgRes] = await Promise.all([
        api.get(API_URL),
        api.get(`${API_URL}/average/value`),
      ]);

      if (ratingsRes.data.status) {
        setRatings(ratingsRes.data.data);
      }
      if (avgRes.data.status) {
        setAverageRating(avgRes.data.average);
      }
    } catch (err) {
      showToastMessage("Gagal memuat data rating", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (id) => {
    if (!window.confirm("Hapus rating ini?")) return;

    try {
      const res = await api.delete(`${API_URL}/${id}`);
      if (res.data.status) {
        showToastMessage("Rating berhasil dihapus");
        fetchRatings();
      }
    } catch (err) {
      showToastMessage("Gagal menghapus rating", "error");
    }
  };

  const exportToExcel = () => {
    const exportData = ratings.map((r) => ({
      Nama: `${r.name} ${r.name_last}`,
      Email: r.email,
      Rating: r.rating,
      Komentar: r.comment,
      Waktu: new Date(r.created_at).toLocaleString("id-ID"),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rating");
    XLSX.writeFile(wb, "Rating_UMKM_Wongkudus.xlsx");
    showToastMessage("Berhasil export ke Excel", "success");
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const totalPages = Math.ceil(ratings.length / itemsPerPage);
  const currentRatings = ratings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDetail = (rating) => {
    setSelectedRating(rating);
  };

  const closeDetail = () => {
    setSelectedRating(null);
  };

  const StarRating = ({ value }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`w-4 h-4 ${
            star <= value ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            {/* TOAST */}
            {showToast && (
              <div
                className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out z-50 text-sm font-medium ${
                  toastType === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    toastType === "success" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {toastType === "success" ? (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span>{toastMessage}</span>
              </div>
            )}

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Daftar Rating
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">Rata-rata:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-orange">
                      {averageRating}
                    </span>
                    <FaStar className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={exportToExcel}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition text-sm font-medium"
                >
                  <FaFileExcel className="w-4 h-4" />
                  Export Excel
                </button>
                <button
                  onClick={fetchRatings}
                  disabled={loading}
                  className="flex items-center gap-2 bg-orange text-white px-4 py-2 rounded-full hover:bg-orange-dark transition text-sm font-medium"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Memuat...
                    </>
                  ) : (
                    <>
                      <FaSync className="w-4 h-4" />
                      Refresh
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* TABLE */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                          No
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                          Pengirim
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                          Email
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                          Komentar
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                          Waktu
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentRatings.length > 0 ? (
                        currentRatings.map((r, idx) => (
                          <tr
                            key={r.id}
                            className="hover:bg-gray-50 transition"
                          >
                            <td className="px-4 py-3 text-gray-700 font-medium">
                              {(currentPage - 1) * itemsPerPage + idx + 1}
                            </td>
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={r.photo_profil}
                                  alt={r.name}
                                  className="w-10 h-10 rounded-full object-cover border"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/40?text=Photo";
                                  }}
                                />
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {r.name} {r.name_last}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-gray-600">
                              {r.email}
                            </td>
                            <td className="px-6 py-3 text-center">
                              <StarRating value={r.rating} />
                            </td>
                            <td className="px-6 py-3 text-gray-700 max-w-xs">
                              <p className="truncate" title={r.comment}>
                                {r.comment}
                              </p>
                            </td>
                            <td className="px-6 py-3 text-xs text-gray-500 whitespace-nowrap">
                              {new Date(r.created_at).toLocaleString("id-ID")}
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => openDetail(r)}
                                  className="text-blue-600 hover:text-blue-700 transition"
                                  title="Lihat Detail"
                                >
                                  <FaEye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteRating(r.id)}
                                  className="text-red-600 hover:text-red-700 transition"
                                  title="Hapus"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-4 py-12 text-center text-gray-500 italic"
                          >
                            Belum ada rating.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION */}
                {ratings.length > itemsPerPage && (
                  <div className="flex justify-between items-center p-4 border-t text-sm text-gray-600">
                    <span>
                      Menampilkan {(currentPage - 1) * itemsPerPage + 1}-
                      {Math.min(currentPage * itemsPerPage, ratings.length)}{" "}
                      dari {ratings.length}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
                      >
                        Prev
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-3 py-1 border rounded transition ${
                            currentPage === i + 1
                              ? "bg-orange text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* DETAIL MODAL */}
        {selectedRating && (
          <div
            className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeDetail}
          >
            <div
              ref={modalRef}
              className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-screen overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Detail Rating
                </h3>
                <button
                  onClick={closeDetail}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedRating.photo_profil}
                    alt={selectedRating.name}
                    className="w-16 h-16 rounded-full object-cover border"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/64?text=Photo";
                    }}
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedRating.name} {selectedRating.name_last}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedRating.email}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <StarRating value={selectedRating.rating} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Komentar</p>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedRating.comment}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Waktu</p>
                  <p className="text-gray-900">
                    {new Date(selectedRating.created_at).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInOut {
            0%,
            100% {
              opacity: 0;
            }
            10%,
            90% {
              opacity: 1;
            }
          }
          .animate-fade-in-out {
            animation: fadeInOut 3s ease-in-out;
          }
        `}</style>
      </div>
    </Layout>
  );
}
