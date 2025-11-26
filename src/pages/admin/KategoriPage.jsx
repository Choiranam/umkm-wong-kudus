import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Layout from "../../components/admin/layout/Layout";
import api from "../../services/api.js";
import Toast from "../../components/admin/Toast";
import DeleteModal from "../../components/admin/DeleteModal.jsx";

const API_CATEGORIES =
  "https://api-umkmwongkudus.rplrus.com/api/categories-blog";

export default function KategoriPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get(API_CATEGORIES);
      if (res.data.status) setCategories(res.data.data);
    } catch (err) {
      showToast("Gagal memuat kategori", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const description = formData.get("description");

    if (!title) {
      showToast("Nama kategori wajib diisi", "error");
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await api.post(
        API_CATEGORIES,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status) {
        showToast("Kategori berhasil ditambahkan");
        setIsAddModalOpen(false);
        fetchCategories();
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Gagal menambah kategori",
        "error"
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const description = formData.get("description");

    if (!title) {
      showToast("Nama kategori wajib diisi", "error");
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await api.post(
        `${API_CATEGORIES}/${selectedCategory.id}`,
        {
          title,
          description,
          _method: "PUT",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status) {
        showToast("Kategori berhasil diperbarui");
        setIsEditModalOpen(false);
        fetchCategories();
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Gagal memperbarui kategori",
        "error"
      );
    }
  };

  const handleDelete = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await api.delete(`${API_CATEGORIES}/${selectedCategory.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status) {
        showToast("Kategori berhasil dinonaktifkan");
        setIsDeleteModalOpen(false);
        fetchCategories();
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Gagal menghapus kategori",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {toast.show && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
              />
            )}

            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  Kategori Artikel
                </h1>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition whitespace-nowrap"
                >
                  <Icon icon="mdi:plus" className="w-5 h-5" />
                  Tambah Kategori
                </button>
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
                          Nama
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deskripsi
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-center divide-gray-200">
                      {currentCategories.length > 0 ? (
                        currentCategories.map((cat, i) => (
                          <tr
                            key={cat.id}
                            className="hover:bg-gray-50 transition text-dark"
                          >
                            <td className="px-5 py-3 text-gray-700">
                              {(currentPage - 1) * itemsPerPage + i + 1}
                            </td>
                            <td className="px-4 py-3 text-left font-medium">
                              {cat.title}
                            </td>
                            <td className="px-4 py-3 text-left text-sm">
                              {cat.description || "-"}
                            </td>
                            <td className="px-4 py-3 text-left">
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
                            <td className="px-4 py-3 text-left">
                              <div className="flex gap-3">
                                <button
                                  onClick={() => {
                                    setSelectedCategory(cat);
                                    setIsViewModalOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-800"
                                  title="Lihat"
                                >
                                  <Icon icon="mdi:eye" className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedCategory(cat);
                                    setIsEditModalOpen(true);
                                  }}
                                  className="text-green-600 hover:text-green-800"
                                  title="Edit"
                                >
                                  <Icon icon="mdi:pencil" className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedCategory(cat);
                                    setIsDeleteModalOpen(true);
                                  }}
                                  className="text-red-600 hover:text-red-800"
                                  title="Hapus"
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
                            colSpan="5"
                            className="px-4 py-8 text-center text-gray-500"
                          >
                            Belum ada kategori.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {currentCategories.length > 0 ? (
                    currentCategories.map((cat, i) => (
                      <div
                        key={cat.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">
                              {cat.title}
                            </div>
                            <div className="text-sm text-gray-600 italic">
                              {cat.description || "-"}
                            </div>
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              cat.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {cat.status}
                          </span>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsViewModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Icon icon="mdi:eye" className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsEditModalOpen(true);
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Icon icon="mdi:pencil" className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Icon
                              icon="mdi:trash-can-outline"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                      Belum ada kategori.
                    </div>
                  )}
                </div>

                {categories.length > itemsPerPage && (
                  <div className="flex justify-center gap-2 mt-6">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 border rounded ${
                          currentPage === i + 1
                            ? "bg-orange-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        {isAddModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsAddModalOpen(false)}
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Tambah Kategori
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="mdi:close" className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Nama Kategori"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
                <textarea
                  name="description"
                  placeholder="Deskripsi (opsional)"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditModalOpen && selectedCategory && (
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsEditModalOpen(false)}
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Edit Kategori
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="mdi:close" className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedCategory.title}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
                <textarea
                  name="description"
                  defaultValue={selectedCategory.description || ""}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                />
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
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isViewModalOpen && selectedCategory && (
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsViewModalOpen(false)}
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Detail Kategori
                </h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="mdi:close" className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-left text-gray-700 mb-1">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    value={selectedCategory.title}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm text-left text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    value={
                      selectedCategory.description || "Tidak ada deskripsi"
                    }
                    rows="3"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-left text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="flex items-start">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedCategory.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedCategory.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Hapus Kategori?"
          message={
            <>
              Apakah Anda yakin ingin menghapus kategori{" "}
              <strong>{selectedCategory?.title}</strong>?
              <br />
              <span className="text-xs text-gray-400">
                Tindakan ini tidak dapat dibatalkan.
              </span>
            </>
          }
          icon="mdi:trash-can-outline"
          iconColor="text-red-600"
          iconBg="bg-red-100"
          confirmText="Hapus Permanen"
          confirmColor="bg-red-600 hover:bg-red-700"
          cancelText="Batal"
        />
      </div>
    </Layout>
  );
}
