import React, { useState, useEffect } from "react";
import Layout from "../../components/admin/layout/Layout";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../API/auth.js"; // Pastikan path benar
import AuthService from "../../API/authService.js"; // Jika perlu get token manual

export default function KategoriPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // success | error

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const API_URL = "https://api-umkmwongkudus.rplrus.com/api/categories-blog";

  // === TOAST ===
  const showToastMessage = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // === FETCH ALL CATEGORIES ===
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get(API_URL);
      if (response.data.status) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToastMessage("Gagal memuat kategori", "error");
    } finally {
      setLoading(false);
    }
  };

  // === CREATE CATEGORY ===
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");

    if (!title.trim()) {
      showToastMessage("Nama kategori wajib diisi", "error");
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      const response = await api.post(
        API_URL,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status) {
        showToastMessage("Kategori berhasil ditambahkan!");
        setIsAddModalOpen(false);
        fetchCategories();
      }
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || "Gagal menambah kategori",
        "error"
      );
    }
  };

  // === UPDATE CATEGORY ===
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");

    if (!title.trim()) {
      showToastMessage("Nama kategori wajib diisi", "error");
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      const response = await api.post(
        `${API_URL}/${selectedCategory.id}`,
        { title, description, _method: "PUT" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status) {
        showToastMessage("Kategori berhasil diperbarui!");
        setIsEditModalOpen(false);
        fetchCategories();
      }
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || "Gagal memperbarui kategori",
        "error"
      );
    }
  };

  // === DELETE CATEGORY ===
  const handleDelete = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      const response = await api.delete(`${API_URL}/${selectedCategory.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status) {
        showToastMessage("Kategori berhasil dinonaktifkan!");
        setIsConfirmDeleteOpen(false);
        fetchCategories();
      }
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || "Gagal menghapus kategori",
        "error"
      );
    }
  };

  // === MODAL HANDLERS ===
  const handleView = (cat) => {
    setSelectedCategory(cat);
    setIsViewModalOpen(true);
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (cat) => {
    setSelectedCategory(cat);
    setIsConfirmDeleteOpen(true);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // === LOAD DATA ON MOUNT ===
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            {/* Toast */}
            {showToast && (
              <div
                className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out z-50 ${
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
                <span className="text-sm font-medium">{toastMessage}</span>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-2xl font-bold text-gray-800">
                Kategori Artikel
              </h1>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-orange text-white px-4 py-2 rounded-full hover:bg-orange transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Tambah Kategori
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
              </div>
            )}

            {/* Tabel */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mt-1">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deskripsi
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {currentCategories.length > 0 ? (
                    currentCategories.map((cat, idx) => (
                      <tr key={cat.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-700">
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {cat.title}
                        </td>
                        <td className="px-4 py-3 text-gray-600 italic text-sm">
                          {cat.description || "-"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              cat.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {cat.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleView(cat)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(cat)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteConfirm(cat)}
                              className="text-red-600 hover:text-red-800"
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
                        colSpan="5"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        Belum ada kategori. Tambahkan kategori baru.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {categories.length > itemsPerPage && (
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>
                  Menampilkan {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, categories.length)} dari{" "}
                  {categories.length}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 border rounded ${
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
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* === MODAL TAMBAH === */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Tambah Kategori
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Nama Kategori"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Deskripsi (opsional)"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none resize-none"
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange transition"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === MODAL VIEW === */}
        {isViewModalOpen && selectedCategory && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Lihat Kategori
                </h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Nama</p>
                  <p className="font-semibold text-gray-900">
                    {selectedCategory.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deskripsi</p>
                  <p className="text-gray-700">
                    {selectedCategory.description || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-gray-700 capitalize">
                    {selectedCategory.status}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === MODAL EDIT === */}
        {isEditModalOpen && selectedCategory && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Edit Kategori
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedCategory.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                  required
                />
                <textarea
                  name="description"
                  defaultValue={selectedCategory.description}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none resize-none"
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === MODAL CONFIRM DELETE === */}
        {isConfirmDeleteOpen && selectedCategory && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl animate-scale-in">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Hapus Kategori?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Apakah Anda yakin ingin menghapus kategori{" "}
                <strong>{selectedCategory.title}</strong>? Tindakan ini tidak
                dapat dibatalkan.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        <style jsx>{`
          @keyframes scaleIn {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-scale-in {
            animation: scaleIn 0.2s ease-out;
          }
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
