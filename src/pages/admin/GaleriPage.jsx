import React, { useState, useEffect } from "react";
import Layout from "../../components/admin/layout/Layout";
import { FaSearch, FaTrash, FaEye, FaUndo, FaUpload, FaTimes } from "react-icons/fa";
import api from "../../services/api.js";

export default function GaleriUMKM() {
  const [activeTab, setActiveTab] = useState("Files");
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [umkms, setUmkms] = useState([]);
  const [selectedUmkm, setSelectedUmkm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // === CREATE FORM STATES ===
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createUmkmId, setCreateUmkmId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const itemsPerPage = 10;

  // === API ENDPOINTS ===
  const BASE_URL = "https://api-umkmwongkudus.rplrus.com/api";
  const GALLERY_URL = `${BASE_URL}/galeri-umkm`;
  const TRASH_URL = `${BASE_URL}/galeri-umkm/trash`;
  const UMKM_URL = `${BASE_URL}/umkm`;

  // === TOAST ===
  const showToastMessage = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // === FETCH UMKM LIST ===
  const fetchUmkms = async () => {
    try {
      const res = await api.get(UMKM_URL);
      if (res.data.status) {
        setUmkms(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch UMKM:", err);
    }
  };

  // === FETCH GALLERIES (Files = active, Trash = inactive) ===
  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const url = activeTab === "Files" ? GALLERY_URL : TRASH_URL;
      const res = await api.get(url);
      if (res.data.status) {
        const data = res.data.data;
        setGalleries(data);
        setFilteredGalleries(data);
      }
    } catch (err) {
      showToastMessage("Gagal memuat galeri", "error");
    } finally {
      setLoading(false);
    }
  };

  // === DELETE (nonaktifkan) ===
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menonaktifkan galeri ini?")) return;
    try {
      await api.delete(`${GALLERY_URL}/${id}`);
      showToastMessage("Galeri dinonaktifkan!");
      fetchGalleries();
    } catch (err) {
      showToastMessage("Gagal menonaktifkan", "error");
    }
  };

  // === RESTORE (aktifkan kembali) ===
  const handleRestore = async (id) => {
    try {
      const fd = new FormData();
      fd.append("_method", "PUT");
      fd.append("status", "active");
      await api.post(`${GALLERY_URL}/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      showToastMessage("Galeri dipulihkan!");
      fetchGalleries();
    } catch (err) {
      showToastMessage("Gagal memulihkan", "error");
    }
  };

  // === HANDLE FILE SELECT (CREATE) ===
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToastMessage("File harus berupa gambar!", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToastMessage("Ukuran maksimal 5MB!", "error");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // === SUBMIT CREATE GALLERY ===
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!createUmkmId || !selectedFile) {
      showToastMessage("Pilih UMKM dan gambar!", "error");
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append("umkm_id", createUmkmId);
    fd.append("image", selectedFile);

    try {
      await api.post(GALLERY_URL, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      showToastMessage("Galeri berhasil ditambahkan!");
      setShowCreateModal(false);
      resetCreateForm();
      fetchGalleries();
    } catch (err) {
      showToastMessage("Gagal upload gambar", "error");
    } finally {
      setUploading(false);
    }
  };

  const resetCreateForm = () => {
    setCreateUmkmId("");
    setSelectedFile(null);
    setPreviewUrl("");
  };

  // === FILTER & SEARCH ===
  useEffect(() => {
    let filtered = galleries;

    if (selectedUmkm) {
      filtered = filtered.filter(g => g.umkm_id === parseInt(selectedUmkm));
    }

    if (searchTerm) {
      filtered = filtered.filter(g => {
        const umkm = umkms.find(u => u.id === g.umkm_id);
        return umkm?.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setFilteredGalleries(filtered);
    setCurrentPage(1);
  }, [galleries, selectedUmkm, searchTerm, umkms]);

  // === PAGINATION ===
  const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);
  const currentItems = filteredGalleries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // === INITIAL FETCH ===
  useEffect(() => {
    fetchUmkms();
    fetchGalleries();
  }, [activeTab]);

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4">
          <div className="max-w-7xl mx-auto">

            {/* TOAST */}
            {showToast && (
              <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-out z-50 ${toastType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${toastType === "success" ? "bg-green-600" : "bg-red-600"}`}>
                  {toastType === "success" ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                  )}
                </div>
                <span className="text-sm font-medium">{toastMessage}</span>
              </div>
            )}

            {/* HEADER + CREATE BUTTON */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Galeri UMKM</h1>
                <p className="text-sm text-gray-600">Kelola semua foto galeri UMKM</p>
              </div>
              {activeTab === "Files" && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-medium"
                >
                  <FaUpload /> Tambah Galeri
                </button>
              )}
            </div>

            {/* TABS */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => { setActiveTab("Files"); setCurrentPage(1); }}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition ${activeTab === "Files" ? "border-orange text-orange" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                Files
              </button>
              <button
                onClick={() => { setActiveTab("Trash"); setCurrentPage(1); }}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition ${activeTab === "Trash" ? "border-orange text-orange" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                Trash
              </button>
            </div>

            {/* FILTERS */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter UMKM</label>
                  <select
                    value={selectedUmkm}
                    onChange={(e) => setSelectedUmkm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange outline-none"
                  >
                    <option value="">Semua UMKM</option>
                    {umkms.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cari Nama UMKM</label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Ketik nama UMKM..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
              </div>
            )}

            {/* TABLE */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UMKM</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Galeri</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.length > 0 ? currentItems.map((g, i) => {
                    const umkm = umkms.find(u => u.id === g.umkm_id);
                    return (
                      <tr key={g.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-700">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                        <td className="px-4 py-3">
                          <img
                            src={g.image}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{umkm?.name || "Unknown"}</td>
                        <td className="px-4 py-3 text-gray-600">#{g.id}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            g.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {g.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <a href={g.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                              <FaEye className="w-4 h-4" />
                            </a>
                            {activeTab === "Files" ? (
                              <button onClick={() => handleDelete(g.id)} className="text-red-600 hover:text-red-800">
                                <FaTrash className="w-4 h-4" />
                              </button>
                            ) : (
                              <button onClick={() => handleRestore(g.id)} className="text-green-600 hover:text-green-800">
                                <FaUndo className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        {activeTab === "Files" ? "Belum ada galeri." : "Sampah kosong."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {filteredGalleries.length > itemsPerPage && (
              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredGalleries.length)} dari {filteredGalleries.length}</span>
                <div className="flex gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-orange text-white" : "hover:bg-gray-100"}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* CREATE MODAL */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Tambah Galeri Baru</h3>
                <button onClick={() => { setShowCreateModal(false); resetCreateForm(); }} className="text-gray-500 hover:text-gray-700">
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih UMKM</label>
                  <select
                    value={createUmkmId}
                    onChange={(e) => setCreateUmkmId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange outline-none"
                    required
                  >
                    <option value="">-- Pilih UMKM --</option>
                    {umkms.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Gambar</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="mx-auto h-32 object-cover rounded-lg mb-2" />
                      ) : (
                        <div className="text-gray-500">
                          <FaUpload className="mx-auto w-8 h-8 mb-2" />
                          <p className="text-sm">Klik untuk upload (max 5MB)</p>
                        </div>
                      )}
                    </label>
                    {selectedFile && (
                      <p className="text-xs text-gray-600 mt-1">{selectedFile.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => { setShowCreateModal(false); resetCreateForm(); }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-orange text-white rounded-lg text-sm hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
                  >
                    {uploading ? (
                      <>Loading...</>
                    ) : (
                      <>Upload</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInOut { 0%, 100% { opacity: 0; } 10%, 90% { opacity: 1; } }
          .animate-fade-in-out { animation: fadeInOut 3s ease-in-out; }
        `}</style>
      </div>
    </Layout>
  );
}