import React, { useState, useEffect } from "react";
import Layout from "../../components/admin/layout/Layout";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const API_URL = "https://api-umkmwongkudus.rplrus.com/api/categories-with-umkm";
const token = localStorage.getItem("token");

export default function KategoriUMKMPage() {
  const [activeTab, setActiveTab] = useState("Files");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showUMKMModal, setShowUMKMModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSingleUMKMModal, setShowSingleUMKMModal] = useState(false);
  const [selectedUMKM, setSelectedUMKM] = useState(null);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("all");

  const [form, setForm] = useState({
    name: "",
    desc: "",
    icon: null,
  });
  const [previewIcon, setPreviewIcon] = useState(null);

  // === TOAST ===
  const showToastMessage = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // === FETCH CATEGORIES WITH UMKM ===
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        showToastMessage("Data kategori tidak valid.", "error");
      }
    } catch (err) {
      showToastMessage("Gagal memuat kategori.", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Reset filter saat ganti tab
  useEffect(() => {
    setSelectedFilterCategory("all");
  }, [activeTab]);

  // === HANDLE INPUT (TEXT & TEXTAREA) ===
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // === HANDLE FILE CHANGE DENGAN PREVIEW ===
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, icon: file }));
      const previewUrl = URL.createObjectURL(file);
      setPreviewIcon(previewUrl);
    } else {
      setForm((prev) => ({ ...prev, icon: null }));
      setPreviewIcon(null);
    }
  };

  // === CREATE ===
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    if (form.icon) formData.append("icon", form.icon);
    try {
      const response = await axios.post(API_URL.replace("-with-umkm", ""), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status) {
        showToastMessage("Kategori berhasil dibuat!");
        closeModal();
        fetchCategories();
      }
    } catch (err) {
      showToastMessage("Gagal membuat kategori.", "error");
    }
  };

  // === EDIT ===
  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("_method", "PUT");
    if (form.icon) formData.append("icon", form.icon);
    try {
      const response = await axios.post(`${API_URL.replace("-with-umkm", "")}/${currentCategory.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status) {
        showToastMessage("Kategori berhasil diperbarui!");
        closeModal();
        fetchCategories();
      }
    } catch (err) {
      showToastMessage("Gagal memperbarui kategori.", "error");
    }
  };

  // === DELETE ===
  const confirmDelete = (cat) => {
    setCategoryToDelete(cat);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      const response = await axios.delete(`${API_URL.replace("-with-umkm", "")}/${categoryToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status) {
        showToastMessage("Kategori dinonaktifkan!");
        setShowDeleteConfirm(false);
        setCategoryToDelete(null);
        fetchCategories();
      }
    } catch (err) {
      showToastMessage("Gagal menonaktifkan kategori.", "error");
    }
  };

  // === MODAL HANDLERS ===
  const openCreateModal = () => {
    setIsEdit(false);
    resetForm();
    setPreviewIcon(null);
    setShowModal(true);
  };

  const openEditModal = (cat) => {
    setIsEdit(true);
    setCurrentCategory(cat);
    setForm({
      name: cat.name,
      desc: cat.desc,
      icon: null,
    });
    setPreviewIcon(cat.icon);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({ name: "", desc: "", icon: null });
    setCurrentCategory(null);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
    if (previewIcon && form.icon) {
      URL.revokeObjectURL(previewIcon);
    }
    setPreviewIcon(null);
  };

  const openUMKMModal = (cat) => {
    setSelectedCategory(cat);
    setShowUMKMModal(true);
  };

  const closeUMKMModal = () => {
    setShowUMKMModal(false);
    setSelectedCategory(null);
  };

  const openSingleUMKMModal = (umkm) => {
    setSelectedUMKM(umkm);
    setShowSingleUMKMModal(true);
  };

  const closeSingleUMKMModal = () => {
    setShowSingleUMKMModal(false);
    setSelectedUMKM(null);
  };

  const summarizeOpeningHours = (hours) => {
    return hours.map(h => `${h.day}: ${h.hours}`).join(" | ");
  };

  // Cleanup preview saat unmount
  useEffect(() => {
    return () => {
      if (previewIcon && form.icon) {
        URL.revokeObjectURL(previewIcon);
      }
    };
  }, [previewIcon, form.icon]);

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
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{toastMessage}</span>
              </div>
            )}

            {/* Header dengan Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
              <h1 className="text-2xl font-bold text-gray-800">Kategori UMKM</h1>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {/* Dropdown Filter - Diurutkan berdasarkan ID */}
                <select
                  value={selectedFilterCategory}
                  onChange={(e) => setSelectedFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange focus:border-orange outline-none min-w-[180px]"
                >
                  <option value="all">Semua Kategori</option>
                  {categories
                    .filter(cat => cat.status === "active")
                    .sort((a, b) => a.id - b.id) // Urutkan berdasarkan ID
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>

                {/* Tombol Tambah Kategori */}
                {activeTab === "Files" && selectedFilterCategory === "all" && (
                  <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 bg-orange text-white px-4 py-2 rounded-full hover:bg-orange-600 transition whitespace-nowrap"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Kategori
                  </button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              {["Files", "Trash"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 font-medium text-sm transition-colors relative ${
                    activeTab === tab
                      ? "text-orange after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tabel Dinamis */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table id="category-table" className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    {selectedFilterCategory === "all" ? (
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    ) : (
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hero Image</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hero Title</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Hours</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={selectedFilterCategory === "all" ? 6 : 7} className="px-6 py-8 text-center text-gray-500">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
                        </td>
                      </tr>
                    ) : selectedFilterCategory === "all" ? (
                      // Mode Kategori
                      categories
                        .filter((cat) => (activeTab === "Files" ? cat.status === "active" : cat.status === "inactive"))
                        .sort((a, b) => a.id - b.id) // Urutkan kategori berdasarkan ID
                        .map((cat) => (
                          <tr key={cat.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-center text-xs font-mono text-gray-700">{cat.id}</td>
                            <td className="px-6 py-4 text-center">
                              <img src={cat.icon} alt={cat.name} className="h-10 w-10 rounded-full object-cover mx-auto" />
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                            <td className="px-6 py-4 text-gray-600 italic text-sm">{cat.desc || "-"}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                cat.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}>
                                {cat.status === "active" ? "Aktif" : "Nonaktif"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex justify-center gap-3">
                                <button
                                  onClick={() => openUMKMModal(cat)}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Lihat UMKM"
                                >
                                  <FaEye className="w-4 h-4" />
                                </button>
                                {activeTab === "Files" && (
                                  <>
                                    <button
                                      onClick={() => openEditModal(cat)}
                                      className="text-green-600 hover:text-green-800"
                                      title="Edit"
                                    >
                                      <FaEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => confirmDelete(cat)}
                                      className="text-red-600 hover:text-red-800"
                                      title="Nonaktifkan"
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                        .length > 0 ? (
                          categories
                            .filter((cat) => (activeTab === "Files" ? cat.status === "active" : cat.status === "inactive"))
                            .sort((a, b) => a.id - b.id)
                            .map((cat) => (
                              <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-center text-xs font-mono text-gray-700">{cat.id}</td>
                                <td className="px-6 py-4 text-center">
                                  <img src={cat.icon} alt={cat.name} className="h-10 w-10 rounded-full object-cover mx-auto" />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                                <td className="px-6 py-4 text-gray-600 italic text-sm">{cat.desc || "-"}</td>
                                <td className="px-6 py-4 text-center">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    cat.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}>
                                    {cat.status === "active" ? "Aktif" : "Nonaktif"}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <div className="flex justify-center gap-3">
                                    <button
                                      onOnClick={() => openUMKMModal(cat)}
                                      className="text-blue-600 hover:text-blue-800"
                                      title="Lihat UMKM"
                                    >
                                      <FaEye className="w-4 h-4" />
                                    </button>
                                    {activeTab === "Files" && (
                                      <>
                                        <button
                                          onClick={() => openEditModal(cat)}
                                          className="text-green-600 hover:text-green-800"
                                          title="Edit"
                                        >
                                          <FaEdit className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => confirmDelete(cat)}
                                          className="text-red-600 hover:text-red-800"
                                          title="Nonaktifkan"
                                        >
                                          <FaTrash className="w-4 h-4" />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                              Tidak ada kategori {activeTab === "Files" ? "aktif" : "dinonaktifkan"}.
                            </td>
                          </tr>
                        )
                    ) : (
                      // Mode UMKM dari kategori terpilih
                      (() => {
                        const selectedCat = categories.find(cat => cat.id === parseInt(selectedFilterCategory));
                        if (!selectedCat) return (
                          <tr>
                            <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                              Kategori tidak ditemukan.
                            </td>
                          </tr>
                        );

                        const filteredUMKM = selectedCat.data_umkm
                          .filter((umkm) => activeTab === "Files" ? umkm.status === "active" : umkm.status === "inactive")
                          .sort((a, b) => a.id - b.id); // Urutkan UMKM berdasarkan ID

                        return filteredUMKM.length > 0 ? (
                          filteredUMKM.map((umkm) => (
                            <tr key={umkm.id} className="hover:bg-gray-50 transition">
                              <td className="px-6 py-4 text-center text-xs font-mono text-gray-700">{umkm.id}</td>
                              <td className="px-6 py-4 text-center">
                                <img src={umkm.hero_image} alt={umkm.name} className="h-10 w-10 rounded-full object-cover mx-auto" />
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900">{umkm.name}</td>
                              <td className="px-6 py-4 text-gray-600 italic text-sm">{umkm.hero_title || "-"}</td>
                              <td className="px-6 py-4 text-center">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  {umkm.rating}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-gray-600 text-sm">{summarizeOpeningHours(umkm.opening_hours) || "-"}</td>
                              <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-3">
                                  <button
                                    onClick={() => openSingleUMKMModal(umkm)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Lihat Detail UMKM"
                                  >
                                    <FaEye className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                              Tidak ada UMKM {activeTab === "Files" ? "aktif" : "dinonaktifkan"} di kategori ini.
                            </td>
                          </tr>
                        );
                      })()
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        {/* === MODAL CREATE / EDIT KATEGORI === */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-scale-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {isEdit ? "Edit Kategori" : "Tambah Kategori Baru"}
                </h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={isEdit ? handleEdit : handleCreate} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                  placeholder="Nama Kategori"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  required
                />
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleInput}
                  placeholder="Deskripsi (opsional)"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none resize-none"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Gambar)</label>
                  <input
                    type="file"
                    name="icon"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {previewIcon && (
                    <div className="mt-3 flex justify-center">
                      <img
                        src={previewIcon}
                        alt="Preview Icon"
                        className="h-20 w-20 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    {isEdit ? "Simpan" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === MODAL CONFIRM DELETE KATEGORI === */}
        {showDeleteConfirm && categoryToDelete && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl animate-scale-in">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Nonaktifkan Kategori?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Apakah Anda yakin ingin <strong className="text-red-600">menonaktifkan</strong> kategori{" "}
                <strong>{categoryToDelete.name}</strong>? Tindakan ini dapat dibatalkan.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Ya, Nonaktifkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === MODAL VIEW UMKM LIST PER KATEGORI === */}
        {showUMKMModal && selectedCategory && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-2xl animate-scale-in overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Daftar UMKM di Kategori: {selectedCategory.name}
                </h3>
                <button onClick={closeUMKMModal} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {selectedCategory.data_umkm && selectedCategory.data_umkm.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama UMKM</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kecamatan</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedCategory.data_umkm.map((umkm) => (
                      <tr key={umkm.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-900">{umkm.name}</td>
                        <td className="px-4 py-3 text-gray-600">{umkm.kecamatan}</td>
                        <td className="px-4 py-3 text-gray-600">{umkm.rating}</td>
                        <td className="px-4 py-3 text-gray-600">{umkm.slug}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500 py-4">Tidak ada UMKM di kategori ini.</p>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeUMKMModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === MODAL VIEW DETAIL SINGLE UMKM === */}
        {showSingleUMKMModal && selectedUMKM && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-2xl animate-scale-in overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Detail UMKM: {selectedUMKM.name}
                </h3>
                <button onClick={closeSingleUMKMModal} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">About</h4>
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: selectedUMKM.about }}></p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Description</h4>
                <p className="text-gray-600">{selectedUMKM.description}</p>
              </div>
              {selectedUMKM.gallery && selectedUMKM.gallery.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Gallery</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedUMKM.gallery.map((img) => (
                      <img key={img.id} src={img.image} alt="Gallery" className="h-20 w-full object-cover rounded" />
                    ))}
                  </div>
                </div>
              )}
              {selectedUMKM.opening_hours && selectedUMKM.opening_hours.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Opening Hours</h4>
                  <ul className="list-disc pl-5">
                    {selectedUMKM.opening_hours.map((hour) => (
                      <li key={hour.id} className="text-gray-600">{hour.day}: {hour.hours}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedUMKM.menus && selectedUMKM.menus.length > 0 ? (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold">Menus</h4>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Menu</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedUMKM.menus.map((menu) => (
                        <tr key={menu.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 font-medium text-gray-900">{menu.name}</td>
                          <td className="px-4 py-3 text-gray-600">{menu.description}</td>
                          <td className="px-4 py-3 text-gray-600">{menu.price}</td>
                          <td className="px-4 py-3 text-center">
                            <img src={menu.image} alt={menu.name} className="h-10 w-10 rounded object-cover mx-auto" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">Tidak ada menu untuk UMKM ini.</p>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeSingleUMKMModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        <style jsx>{`
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in { animation: scaleIn 0.2s ease-out; }
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