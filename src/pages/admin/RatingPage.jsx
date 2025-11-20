import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Layout from "../../components/admin/layout/Layout";
import { FaSync, FaFileExcel, FaTimes } from "react-icons/fa";
import api from "../../services/api.js";
import * as XLSX from "xlsx";
import Toast from "../../components/admin/Toast";
import Pagination from "../../components/admin/Pagination";
import DeleteModal from "../../components/admin/DeleteModal";

export default function RatingAdminPage() {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ratingToDelete, setRatingToDelete] = useState(null);

  const itemsPerPage = 5;
  const API_URL = "/rating";

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
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
      showToast("Gagal memuat data rating", "error");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setRatingToDelete(id);
    setDeleteModalOpen(true);
  };

  const deleteRating = async () => {
    if (!ratingToDelete) return;

    try {
      const res = await api.delete(`${API_URL}/${ratingToDelete}`);
      if (res.data.status) {
        showToast("Rating berhasil dihapus", "success");
        setDeleteModalOpen(false);
        setRatingToDelete(null);
        fetchRatings();
      }
    } catch (err) {
      showToast("Gagal menghapus rating", "error");
    }
  };

  const exportToExcel = () => {
    const exportData = ratings.map((r) => ({
      Nama: `${r.name} ${r.name_last || ""}`.trim(),
      Email: r.email,
      Rating: r.rating,
      Komentar: r.comment || "-",
      Waktu: new Date(r.created_at).toLocaleString("id-ID"),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rating");
    XLSX.writeFile(wb, "Rating_UMKM_WongKudus.xlsx");
    showToast("Berhasil export ke Excel", "success");
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const totalPages = Math.ceil(ratings.length / itemsPerPage);
  const currentRatings = ratings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openDetail = (rating) => setSelectedRating(rating);
  const closeDetail = () => setSelectedRating(null);

  const StarRating = ({ value }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          icon="mdi:star"
          className={`w-5 h-5 ${
            star <= value ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 font-medium text-gray-700">{value}.0</span>
    </div>
  );
                                          
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

            {/* Header */}
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Manajemen Rating & Ulasan
                  </h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Rata-rata Rating:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-600">
                        {averageRating.toFixed(1)}
                      </span>
                      <Icon
                        icon="mdi:star"
                        className="w-7 h-7 text-yellow-500"
                      />
                      <span>({ratings.length} ulasan)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <FaFileExcel className="w-5 h-5" />
                    Export Excel
                  </button>
                  <button
                    onClick={fetchRatings}
                    disabled={loading}
                    className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    {loading ? (
                      "Memuat..."
                    ) : (
                      <>
                        <FaSync className="w-5 h-5" /> Refresh
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <>
                {/* Desktop Table - SUDAH DIRAPIHIN 100% KAYAK YANG AWAL */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hidden md:block overflow-x-hidden">
                  <table className="w-full text-sm table-fixed">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pengirim
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Komentar
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Waktu
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                            {/* No */}
                            <td className="px-6 py-4 text-center text-gray-700 font-medium">
                              {(currentPage - 1) * itemsPerPage + idx + 1}
                            </td>

                            {/* Pengirim - RATA TENGAH */}
                            <td className="px-6 py-4">
                              <div className="flex flex-col items-center gap-2">
                                <img
                                  src={
                                    r.photo_profil ||
                                    "https://via.placeholder.com/40?text=U"
                                  }
                                  alt={r.name}
                                  className="w-10 h-10 rounded-full object-cover border"
                                  onError={(e) =>
                                    (e.target.src =
                                      "https://via.placeholder.com/40?text=U")
                                  }
                                />
                                <span className="font-medium text-gray-900 text-center block">
                                  {r.name} {r.name_last || ""}
                                </span>
                              </div>
                            </td>

                            {/* Email - CENTER */}
                            <td className="px-6 py-4 text-left text-gray-600 max-w-[180px] truncate">
                              {r.email}
                            </td>

                            {/* Rating - CENTER */}
                            <td className="px-6 py-4 text-left">
                              <StarRating value={r.rating} />
                            </td>

                            {/* Komentar - Tetap truncate tapi center */}
                            <td className="px-6 py-4 text-left">
                              <p
                                className="max-w-[200px] truncate text-gray-700"
                                title={r.comment || "-"}
                              >
                                {r.comment || "-"}
                              </p>
                            </td>

                            {/* Waktu - CENTER */}
                            <td className="px-6 py-4 text-left text-xs text-gray-500 max-w-[140px] truncate">
                              {new Date(r.created_at).toLocaleString("id-ID")}
                            </td>

                            {/* Aksi - CENTER */}
                            <td className="px-6 py-4 text-left">
                              <div className="flex justify-start gap-4">
                                <button
                                  onClick={() => openDetail(r)}
                                  className="text-blue-600 hover:text-blue-800 transition"
                                >
                                  <Icon icon="mdi:eye" className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => openDeleteModal(r.id)}
                                  className="text-red-600 hover:text-red-800 transition"
                                >
                                  <Icon
                                    icon="mdi:trash-can-outline"
                                    className="w-5 h-5"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-12 text-center text-gray-500 italic"
                          >
                            Belum ada rating.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card - SPACING LEBIH RAPI */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {currentRatings.map((r) => (
                    <div
                      key={r.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={
                            r.photo_profil ||
                            "https://via.placeholder.com/48?text=U"
                          }
                          alt={r.name}
                          className="w-12 h-12 rounded-full object-cover border"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/48?text=U")
                          }
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {r.name} {r.name_last || ""}
                          </p>
                          <p className="text-sm text-gray-600">{r.email}</p>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 font-medium">
                            Rating:
                          </span>
                          <StarRating value={r.rating} />
                        </div>
                        <div>
                          <p className="text-gray-700 italic leading-relaxed">
                            "{r.comment || "Tidak ada komentar"}"
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(r.created_at).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex justify-end gap-5 mt-5">
                        <button
                          onClick={() => openDetail(r)}
                          className="text-blue-600"
                        >
                          <Icon icon="mdi:eye" className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(r.id)}
                          className="text-red-600"
                        >
                          <Icon
                            icon="mdi:trash-can-outline"
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination */}
                {ratings.length > itemsPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </main>

        {selectedRating && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50 p-4 md:p-8"
            onClick={closeDetail}
          >
            <div
              className="relative bg-white rounded-2xl shadow-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Detail Rating
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID: #{selectedRating?.id || "-"}
                  </p>
                </div>
                <button
                  onClick={closeDetail}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* BODY */}
              <div className="p-6 md:p-10 space-y-10">
                {/* PROFILE */}
                <div className="flex items-center gap-6">
                  <img
                    src={
                      selectedRating?.photo_profil ||
                      "https://via.placeholder.com/120?text=User"
                    }
                    alt={selectedRating?.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/120?text=User")
                    }
                  />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedRating?.name || "Nama"}{" "}
                      {selectedRating?.name_last || ""}
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                      {selectedRating?.email || "-"}
                    </p>
                  </div>
                </div>

                {/* RATING */}
                <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-3">
                    Rating
                  </p>

                  <div className="flex justify-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        icon="mdi:star"
                        className={`w-10 h-10 ${
                          star <= (selectedRating?.rating || 0)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-5xl font-bold text-gray-800">
                    {(selectedRating?.rating || 0).toFixed(1)}
                  </p>
                </div>

                {/* KOMENTAR */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-600 text-center">
                    Komentar
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <p className="text-lg text-gray-800 text-center leading-relaxed italic">
                      {selectedRating?.comment?.trim() ? (
                        `"${selectedRating.comment}"`
                      ) : (
                        <span className="text-gray-500">
                          — Tidak ada komentar —
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* TANGGAL */}
                <div className="text-center border-t border-gray-200 pt-6">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Dikirim pada
                  </p>
                  <p className="text-lg text-gray-800">
                    {selectedRating?.created_at
                      ? new Date(selectedRating?.created_at).toLocaleString(
                          "id-ID",
                          {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "-"}
                  </p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
                <div className="flex justify-end">
                  <button
                    onClick={closeDetail}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl shadow transition"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={deleteRating}
          title="Hapus Rating"
          message="Apakah Anda yakin ingin menghapus rating ini? Tindakan ini tidak dapat dibatalkan."
          confirmText="Hapus"
          icon="mdi:alert-outline"
          iconColor="text-red-600"
          iconBg="bg-red-100"
          confirmColor="bg-red-600 hover:bg-red-700"
        />
      </div>
    </Layout>
  );
}
