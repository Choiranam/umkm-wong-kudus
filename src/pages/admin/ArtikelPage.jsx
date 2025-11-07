import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/admin/layout/Layout";
import { FaEye, FaEdit, FaTrash, FaFilter, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../API/auth.js";

export default function ArtikelPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const itemsPerPage = 5;

  // Edit Form States
  const [editImagePreview, setEditImagePreview] = useState("");
  const [editImageName, setEditImageName] = useState("");
  const [editContentLength, setEditContentLength] = useState(0);
  const fileInputRef = useRef(null);

  const API_ARTIKEL = "https://api-umkmwongkudus.rplrus.com/api/articles";
  const API_KATEGORI = "https://api-umkmwongkudus.rplrus.com/api/categories-blog";

  const MAX_CONTENT_LENGTH = 1000;

  const navigate = useNavigate();

  // === TOAST ===
  const showToastMessage = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // === GET TOKEN ===
  const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

  // === FETCH KATEGORI ===
  const fetchCategories = async () => {
    try {
      const res = await api.get(API_KATEGORI);
      if (res.data.status) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // === FETCH ARTIKEL ===
  const fetchArticles = async (categoryId = null) => {
    setLoading(true);
    try {
      const url = categoryId ? `${API_ARTIKEL}/category/${categoryId}` : API_ARTIKEL;
      const res = await api.get(url);
      if (res.data.status) setArticles(res.data.data || []);
    } catch (err) {
      showToastMessage("Gagal memuat artikel", "error");
    } finally {
      setLoading(false);
    }
  };

  // === HANDLE IMAGE CHANGE (EDIT) ===
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToastMessage("Ukuran gambar maksimal 5MB!", "error");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      showToastMessage("Format gambar harus JPG atau PNG!", "error");
      return;
    }

    setEditImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => setEditImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // === HANDLE CONTENT CHANGE (EDIT) ===
  const handleEditContentChange = (e) => {
    const text = e.target.value;
    setEditContentLength(text.length);
  };

  // === UPDATE ARTIKEL ===
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("_method", "PUT");

    const content = formData.get("content")?.trim();
    if (!content) {
      showToastMessage("Isi artikel wajib diisi!", "error");
      return;
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      showToastMessage(`Isi artikel maksimal ${MAX_CONTENT_LENGTH} karakter!`, "error");
      return;
    }

    const token = getToken();
    if (!token) return showToastMessage("Token tidak ditemukan", "error");

    try {
      const res = await api.post(`${API_ARTIKEL}/${selectedArticle.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status) {
        showToastMessage("Artikel berhasil diperbarui!", "success");
        setIsEditModalOpen(false);
        fetchArticles(selectedCategoryFilter);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Gagal memperbarui artikel";
      showToastMessage(msg, "error");
    }
  };

  // === DELETE ===
  const handleDelete = async () => {
    const token = getToken();
    if (!token) return showToastMessage("Token tidak ditemukan", "error");

    try {
      const res = await api.delete(`${API_ARTIKEL}/${selectedArticle.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status) {
        showToastMessage("Artikel berhasil dinonaktifkan!", "success");
        setIsConfirmDeleteOpen(false);
        fetchArticles(selectedCategoryFilter);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Gagal menghapus artikel", "error");
    }
  };

  // === MODAL HANDLERS ===
  const handleView = (art) => {
    setSelectedArticle(art);
    setIsViewModalOpen(true);
  };

  const handleEdit = (art) => {
    setSelectedArticle(art);
    setEditImagePreview(art.image || "");
    setEditImageName(art.image ? "Gambar saat ini" : "Belum ada gambar");
    setEditContentLength(art.content?.length || 0);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (art) => {
    setSelectedArticle(art);
    setIsConfirmDeleteOpen(true);
  };

  const handleFilter = () => {
    fetchArticles(selectedCategoryFilter || null);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // === PAGINATION ===
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const currentArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // === LOAD DATA ===
  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // === TRUNCATE TEXT ===
  const truncateText = (text, maxLength = 80) => {
    if (!text) return "-";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4">
          <div className="max-w-7xl mx-auto">
            {/* Toast */}
            {showToast && (
              <div
                className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out z-50 ${
                  toastType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                    toastType === "success" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {toastType === "success" ? "Check" : "X"}
                </div>
                <span className="text-sm font-medium">{toastMessage}</span>
              </div>
            )}

            {/* Header + Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
              <h1 className="text-2xl font-bold text-gray-800">Manajemen Artikel</h1>
              <div className="flex gap-2 w-full md:w-auto">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange outline-none"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
                <button onClick={handleFilter} className="flex items-center gap-1 px-3 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition">
                  <FaFilter className="w-4 h-4" /> Filter
                </button>
                <Link
                  to="/artikel-admin/create"
                  className="flex items-center gap-2 bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-dark transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Artikel
                </Link>
              </div>
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
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">No</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Judul</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Kategori</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gambar</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Paragraf</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentArticles.length > 0 ? (
                    currentArticles.map((art, idx) => (
                      <tr key={art.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-center text-gray-700">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                        <td className="px-4 py-3 text-center font-medium text-gray-900 max-w-xs truncate">{art.title}</td>
                        <td className="px-4 py-3 text-center text-gray-600">
                          {categories.find((c) => c.id == art.category_blog_id)?.title || "-"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {art.image ? (
                            <img src={art.image} alt={art.title} className="w-16 h-16 object-cover rounded mx-auto" />
                          ) : (
                            <span className="text-gray-400 text-xs">Tidak ada</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600 text-xs max-w-xs">
                          <div className="truncate" title={art.content}>
                            {truncateText(art.content)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              art.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {art.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => handleView(art)} className="text-blue-600 hover:text-blue-800">
                              <FaEye className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleEdit(art)} className="text-green-600 hover:text-green-800">
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteConfirm(art)} className="text-red-600 hover:text-red-800">
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">Belum ada artikel.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {articles.length > itemsPerPage && (
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>
                  Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, articles.length)} dari {articles.length}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-orange text-white" : "hover:bg-gray-100"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* === MODAL VIEW ARTIKEL === */}
        {isViewModalOpen && selectedArticle && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8 mx-4">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedArticle.title}</h2>
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {selectedArticle.image ? (
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
                    Tidak ada gambar
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Penulis</p>
                    <p className="font-semibold text-gray-800">{selectedArticle.author}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Kategori</p>
                    <p className="font-semibold text-gray-800">
                      {categories.find((c) => c.id == selectedArticle.category_blog_id)?.title || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                        selectedArticle.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedArticle.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Isi Artikel</h3>
                  <div
                    className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-xl border border-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: selectedArticle.content || "<em class='text-gray-400'>Tidak ada konten.</em>",
                    }}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-6 py-2 bg-orange text-white rounded-lg hover:bg-orange-dark transition font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === MODAL EDIT === */}
        {isEditModalOpen && selectedArticle && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Edit Artikel</h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-5">
                {/* Kategori */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori *</label>
                  <select
                    name="category_blog_id"
                    defaultValue={selectedArticle.category_blog_id}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                  </select>
                </div>

                {/* Judul */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Judul *</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedArticle.title}
                    required
                    maxLength="200"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                  />
                </div>

                {/* Penulis */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Penulis *</label>
                  <input
                    type="text"
                    name="author"
                    defaultValue={selectedArticle.author}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                  />
                </div>

                {/* Gambar + Preview */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Gambar</label>
                  {editImagePreview && (
                    <div className="mb-3">
                      <img
                        src={editImagePreview}
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
                      />
                      <p className="text-center text-xs text-green-600 mt-1">{editImageName}</p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg,image/jpg,image/png"
                    ref={fileInputRef}
                    onChange={handleEditImageChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange transition text-center"
                  >
                    <FaImage className="mx-auto text-4xl text-gray-400 mb-2" />
                    <p className="text-sm">Klik untuk ganti gambar</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, max 5MB</p>
                  </div>
                </div>

                {/* Paragraf - Textarea Biasa (Resizable) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Paragraf * <span className="text-xs text-gray-500">(Maksimal {MAX_CONTENT_LENGTH} karakter)</span>
                  </label>
                  <textarea
                    name="content"
                    required
                    defaultValue={selectedArticle.content}
                    rows="10"
                    maxLength={MAX_CONTENT_LENGTH}
                    onChange={handleEditContentChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none resize-vertical"
                    style={{ minHeight: "150px", maxHeight: "500px" }}
                  ></textarea>
                  <div className="flex justify-end text-xs text-gray-500 mt-1">
                    <span className={editContentLength > MAX_CONTENT_LENGTH * 0.9 ? "text-red-600" : ""}>
                      {editContentLength}/{MAX_CONTENT_LENGTH}
                    </span>
                  </div>
                </div>

                {/* Tombol */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-orange text-white rounded-lg hover:bg-orange-dark font-medium flex items-center gap-2"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === MODAL CONFIRM DELETE === */}
        {isConfirmDeleteOpen && selectedArticle && (
          <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Hapus Artikel?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Artikel <strong>{selectedArticle.title}</strong> akan dinonaktifkan.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Nonaktifkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
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