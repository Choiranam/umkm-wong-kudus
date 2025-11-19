import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/admin/layout/Layout";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import api from "../../services/api.js";
import Toast from "../../components/admin/Toast";
import DeleteModal from "../../components/admin/DeleteModal.jsx";

const API_ARTIKEL = "/articles";
const API_KATEGORI = "/categories-blog";

export default function ArtikelPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [viewModal, setViewModal] = useState({ open: false, data: null });
  const [editModal, setEditModal] = useState({ open: false, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    category_blog_id: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get(API_KATEGORI);
      if (res.data.status) setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_ARTIKEL);
      if (res.data.status) setArticles(res.data.data || []);
    } catch (err) {
      showToast("Gagal memuat artikel", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const openEdit = (art) => {
    setForm({
      title: art.title,
      author: art.author,
      content: art.content || "",
      category_blog_id: art.category_blog_id,
      image: null,
    });
    setPreview(art.image || null);
    setEditModal({ open: true, data: art });
  };

  const resetForm = () => {
    setForm({
      title: "",
      author: "",
      content: "",
      category_blog_id: "",
      image: null,
    });
    setPreview(null);
    setEditModal({ open: false, data: null });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("author", form.author);
    fd.append("content", form.content);
    fd.append("category_blog_id", form.category_blog_id);
    fd.append("_method", "PUT");
    if (form.image) fd.append("image", form.image);

    try {
      await api.post(`${API_ARTIKEL}/${editModal.data.id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Artikel berhasil diperbarui");
      resetForm();
      fetchArticles();
    } catch (err) {
      showToast("Gagal memperbarui artikel", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`${API_ARTIKEL}/${deleteConfirm.id}`);
      showToast("Artikel dinonaktifkan");
      setDeleteConfirm(null);
      fetchArticles();
    } catch (err) {
      showToast("Gagal menonaktifkan artikel", "error");
    }
  };

  return (
    <Layout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="p-4 md:p-6 lg:p-8 max-w-full mx-auto">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Manajemen Artikel
            </h1>
            <div className="flex gap-3">
              <Link
                to="/artikel-admin/create"
                className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition whitespace-nowrap"
              >
                <Icon icon="mdi:plus" className="w-5 h-5" />
                Tambah Artikel
              </Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col overflow-hidden"
              >
                <div className="p-6 grow">
                  {art.image ? (
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4 flex items-center justify-center">
                      <Icon
                        icon="mdi:image-off"
                        className="w-12 h-12 text-gray-400"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {art.content?.replace(/<[^>]*>/g, "") || "Tidak ada konten"}
                  </p>
                </div>

                <div className="border-t border-gray-100 bg-gray-50/50 p-5">
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-gray-700">Kategori</span>
                    <span className="font-medium text-orange-600 truncate max-w-[180px]">
                      {categories.find((c) => c.id == art.category_blog_id)
                        ?.title || "-"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setViewModal({ open: true, data: art })}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition truncate"
                    >
                      <Icon icon="mdi:eye" className="w-4 h-4 shrink-0" />
                      Lihat
                    </button>

                    <button
                      onClick={() => openEdit(art)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition truncate"
                    >
                      <Icon icon="mdi:pencil" className="w-4 h-4 shrink-0" />
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteConfirm(art)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition truncate"
                    >
                      <Icon
                        icon="mdi:trash-can-outline"
                        className="w-4 h-4 shrink-0"
                      />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-2xl shadow-xl">
            <Icon
              icon="mdi:folder-search-outline"
              className="w-20 h-20 text-gray-300 mx-auto"
            />
            <h3 className="text-2xl font-semibold text-gray-700 mt-6">
              Tidak Ada Artikel
            </h3>
            <p className="text-gray-500 mt-2">
              Belum ada artikel yang ditambahkan.
            </p>
          </div>
        )}
      </div>

      {viewModal.open && viewModal.data && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setViewModal({ open: false, data: null });
            }
          }}
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-5xl h-[92vh] flex flex-col">
            {/* Header - Tetap di atas */}
            <div className="shrink-0 p-8 pb-4 border-b border-gray-100 flex justify-between items-start">
              <h2 className="text-3xl font-bold text-gray-900">
                {viewModal.data.title}
              </h2>
              <button
                onClick={() => setViewModal({ open: false, data: null })}
                className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition shadow-sm"
              >
                <Icon icon="mdi:close" className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Body - Scrollable */}
            <div className="flex-1 overflow-y-auto px-8 pt-6 pb-10">
              {/* Gambar */}
              <div className="mb-8, mb-8">
                {viewModal.data.image ? (
                  <img
                    src={viewModal.data.image}
                    alt={viewModal.data.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-md"
                  />
                ) : (
                  <div className="w-full h-96 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Icon
                      icon="mdi:image-off"
                      className="w-20 h-20 text-gray-400"
                    />
                  </div>
                )}
              </div>

              {/* Info Meta */}
              <div className="mb-10 bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Penulis</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {viewModal.data.author}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kategori</p>
                    <p className="text-lg font-semibold text-orange-600">
                      {categories.find(
                        (c) => c.id == viewModal.data.category_blog_id
                      )?.title || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-flex mt-1 px-4 py-1.5 rounded-full text-sm font-semibold shadow ${
                        viewModal.data.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {viewModal.data.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* ISI ARTIKEL - Ini yang paling penting, diberi ruang besar & scrollable */}
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      viewModal.data.content ||
                      "<em class='text-gray-400'>Tidak ada konten yang ditampilkan.</em>",
                  }}
                />
              </div>
            </div>

            {/* Footer - Tetap di bawah */}
            <div className="shrink-0 p-8 border-t bg-gray-50 rounded-b-3xl">
              <div className="flex justify-end">
                <button
                  onClick={() => setViewModal({ open: false, data: null })}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-md transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editModal.open && editModal.data && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetForm();
            }
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
            <div className="max-h-[90vh] overflow-hidden">
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-orange">Edit Artikel</h2>
              </div>

              <form
                onSubmit={handleUpdate}
                className="p-8 space-y-7 max-h-[calc(90vh-120px)] overflow-y-auto"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={form.category_blog_id}
                    onChange={(e) =>
                      setForm({ ...form, category_blog_id: e.target.value })
                    }
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    placeholder="Judul Artikel"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Penulis
                  </label>
                  <input
                    type="text"
                    placeholder="Penulis"
                    value={form.author}
                    onChange={(e) =>
                      setForm({ ...form, author: e.target.value })
                    }
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Gambar
                  </label>
                  {preview && (
                    <div className="mb-5">
                      <img
                        src={preview}
                        alt="Preview gambar artikel"
                        className="w-full max-w-2xl mx-auto h-80 object-cover rounded-2xl shadow-lg border-4 border-gray-100"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="block w-full text-sm text-gray-600 
                         file:mr-5 file:py-3 file:px-6 
                         file:rounded-full file:border-0 
                         file:bg-orange-50 file:text-orange-700 
                         hover:file:bg-orange-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Isi Artikel (HTML diperbolehkan)
                  </label>
                  <textarea
                    placeholder="Isi Artikel (HTML diperbolehkan)"
                    rows={12}
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none font-mono text-sm leading-relaxed"
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-3.5 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/30"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        title="Nonaktifkan Artikel?"
        message={
          <>
            Apakah Anda yakin ingin <strong>menonaktifkan</strong> artikel:
            <br />
            <span className="font-semibold text-orange-600">
              "{deleteConfirm?.title}"
            </span>
            ?
            <br />
            <span className="text-xs text-gray-500 mt-2 block">
              Artikel tidak akan dihapus permanen, hanya dinonaktifkan.
            </span>
          </>
        }
        icon="mdi:trash-can-outline"
        iconColor="text-red-600"
        iconBg="bg-red-100"
        confirmText="Ya, Nonaktifkan"
        confirmColor="bg-red-600 hover:bg-red-700"
        cancelText="Batal"
      />
    </Layout>
  );
}
