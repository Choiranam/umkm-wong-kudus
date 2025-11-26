import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Layout from "../../components/admin/layout/Layout";
import api from "../../services/api.js";
import Toast from "../../components/admin/Toast";
import DeleteModal from "../../components/admin/DeleteModal.jsx";
import Pagination from "../../components/admin/Pagination";

export default function GaleriUMKM() {
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [umkms, setUmkms] = useState([]);
  const [selectedUmkmFilter, setSelectedUmkmFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createUmkmId, setCreateUmkmId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [viewImageModal, setViewImageModal] = useState({
    show: false,
    url: "",
  });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const itemsPerPage = 20;
  const GALLERY_URL = "/galeri-umkm";
  const UMKM_URL = "/umkm";

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => setToast({ ...toast, show: false });

  const fetchUmkms = async () => {
    try {
      const res = await api.get(UMKM_URL);
      if (res.data.status) setUmkms(res.data.data);
    } catch (err) {
      console.error("Failed to fetch UMKM");
    }
  };

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const res = await api.get(GALLERY_URL);
      if (res.data.status) {
        const data = res.data.data;
        setGalleries(data);
        setFilteredGalleries(data);
      }
    } catch (err) {
      showToast("Gagal memuat galeri", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`${GALLERY_URL}/${deleteModal.id}`);
      showToast("Galeri dinonaktifkan!");
      setDeleteModal({ show: false, id: null });
      fetchGalleries();
    } catch (err) {
      showToast("Gagal menonaktifkan", "error");
    }
  };

  const openDeleteModal = (id) => setDeleteModal({ show: true, id });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("File harus berupa gambar!", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran maksimal 5MB!", "error");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!createUmkmId || !selectedFile) {
      showToast("Pilih UMKM dan gambar!", "error");
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append("umkm_id", createUmkmId);
    fd.append("image", selectedFile);

    try {
      await api.post(GALLERY_URL, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Galeri berhasil ditambahkan!");
      setShowCreateModal(false);
      resetCreateForm();
      fetchGalleries();
    } catch (err) {
      showToast("Gagal upload gambar", "error");
    } finally {
      setUploading(false);
    }
  };

  const resetCreateForm = () => {
    setCreateUmkmId("");
    setSelectedFile(null);
    setPreviewUrl("");
  };

  useEffect(() => {
    let filtered = galleries;

    if (selectedUmkmFilter) {
      filtered = filtered.filter(
        (g) => g.umkm_id === parseInt(selectedUmkmFilter)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((g) => {
        const umkm = umkms.find((u) => u.id === g.umkm_id);
        return umkm?.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setFilteredGalleries(filtered);
    setCurrentPage(1);
  }, [galleries, selectedUmkmFilter, searchTerm, umkms]);

  useEffect(() => {
    fetchUmkms();
    fetchGalleries();
  }, []);

  const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);
  const currentItems = filteredGalleries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {toast.show && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
              />
            )}

            <DeleteModal
              isOpen={deleteModal.show}
              onClose={() => setDeleteModal({ show: false, id: null })}
              onConfirm={handleDelete}
              title="Hapus Galeri"
              message="Apakah Anda yakin ingin menonaktifkan galeri ini? Tindakan ini tidak dapat dibatalkan."
              confirmText="Hapus"
            />

            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  Manajemen Galeri
                </h1>

                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <select
                    value={selectedUmkmFilter}
                    onChange={(e) => setSelectedUmkmFilter(e.target.value)}
                    className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Semua UMKM</option>
                    {umkms.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>

                  <div className="relative w-full md:w-48">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Cari UMKM..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    <Icon icon="mdi:plus" className="w-5 h-5" />
                    Tambah Galeri
                  </button>
                </div>
              </div>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              </div>
            )}

            {!loading && (
              <>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hidden md:block">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preview
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          UMKM
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentItems.length > 0 ? (
                        currentItems.map((g, i) => {
                          const umkm = umkms.find((u) => u.id === g.umkm_id);
                          return (
                            <tr key={g.id} className="hover:bg-gray-50 text-dark">
                              <td className="px-5 py-3 text-center text-gray-700">
                                {(currentPage - 1) * itemsPerPage + i + 1}
                              </td>
                              <td className="px-4 py-3">
                                <img
                                  src={g.image}
                                  alt="Preview"
                                  className="w-12 h-12 object-cover rounded border border-gray-200"
                                />
                              </td>
                              <td className="px-4 py-3 font-medium text-left text-gray-900 max-w-[200px] truncate">
                                {umkm?.name || "Unknown"}
                              </td>
                              <td className="px-4 text-left py-3">
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    g.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {g.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-3">
                                  <button
                                    onClick={() =>
                                      setViewImageModal({
                                        show: true,
                                        url: g.image,
                                      })
                                    }
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <Icon icon="mdi:eye" className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => openDeleteModal(g.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Icon
                                      icon="mdi:trash-can-outline"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-4 py-8 text-center text-gray-500"
                          >
                            Belum ada galeri.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {currentItems.length > 0 ? (
                    currentItems.map((g) => {
                      const umkm = umkms.find((u) => u.id === g.umkm_id);
                      return (
                        <div
                          key={g.id}
                          className="bg-white rounded-lg shadow-sm border p-4"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={g.image}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded border"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {umkm?.name}
                                </div>
                                <span
                                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                    g.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {g.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-3 border-t pt-3">
                            <button
                              onClick={() =>
                                setViewImageModal({ show: true, url: g.image })
                              }
                              className="text-blue-600"
                            >
                              <Icon icon="mdi:eye" className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(g.id)}
                              className="text-red-600"
                            >
                              <Icon
                                icon="mdi:trash-can-outline"
                                className="w-5 h-5"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 bg-white rounded-lg border text-gray-500">
                      Belum ada galeri.
                    </div>
                  )}
                </div>

                {totalPages > 1 && (
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

        {showCreateModal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCreateModal(false);
                resetCreateForm();
              }
            }}
          >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Tambah Galeri Baru
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetCreateForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="mdi:close" className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pilih UMKM
                  </label>
                  <select
                    value={createUmkmId}
                    onChange={(e) => setCreateUmkmId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  >
                    <option value="">-- Pilih UMKM --</option>
                    {umkms.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Gambar
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto h-40 object-contain rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-500">
                        <Icon
                          icon="mdi:cloud-upload"
                          className="mx-auto w-10 h-10 mb-2 text-gray-400"
                        />
                        <p className="text-sm font-medium">Klik untuk upload</p>
                        <p className="text-xs text-gray-400">
                          JPG, PNG (Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      resetCreateForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2 transition"
                  >
                    {uploading ? "Loading..." : "Simpan Galeri"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {viewImageModal.show && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-60 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget)
                setViewImageModal({ show: false, url: "" });
            }}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] flex justify-center">
              <button
                onClick={() => setViewImageModal({ show: false, url: "" })}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <Icon icon="mdi:close" className="w-8 h-8" />
              </button>
              <img
                src={viewImageModal.url}
                alt="Full View"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
