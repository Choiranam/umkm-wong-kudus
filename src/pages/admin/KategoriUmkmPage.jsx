import React, { useState, useEffect } from "react";
import Layout from "../../components/admin/layout/Layout";
import { Icon } from "@iconify/react";
import api from "../../services/api";

const API_CATEGORIES = "/categories";
const API_CATEGORIES_WITH_UMKM = "/categories-with-umkm";

export default function KategoriUMKMPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [modal, setModal] = useState({ open: false, edit: false, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [umkmList, setUmkmList] = useState({ open: false, category: null });
  const [umkmDetail, setUmkmDetail] = useState({ open: false, data: null });

  const [form, setForm] = useState({ name: "", desc: "", icon: null });
  const [preview, setPreview] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000
    );
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get(API_CATEGORIES_WITH_UMKM);
      if (res.data.status && Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      }
    } catch (err) {
      showToast("Gagal memuat data kategori", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, icon: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({ name: "", desc: "", icon: null });
    setPreview(null);
    setModal({ open: false, edit: false, data: null });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("desc", form.desc);
    if (form.icon) fd.append("icon", form.icon);

    try {
      await api.post(API_CATEGORIES, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Kategori berhasil ditambahkan");
      resetForm();
      fetchCategories();
    } catch (err) {
      showToast("Gagal menambah kategori", "error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("desc", form.desc);
    fd.append("_method", "PUT");
    if (form.icon) fd.append("icon", form.icon);

    try {
      await api.post(`${API_CATEGORIES}/${modal.data.id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Kategori berhasil diperbarui");
      resetForm();
      fetchCategories();
    } catch (err) {
      showToast("Gagal memperbarui kategori", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`${API_CATEGORIES}/${deleteConfirm.id}`);
      showToast("Kategori dinonaktifkan");
      setDeleteConfirm(null);
      fetchCategories();
    } catch (err) {
      showToast("Gagal menonaktifkan kategori", "error");
    }
  };

  const openEdit = (cat) => {
    setForm({ name: cat.name, desc: cat.desc || "", icon: null });
    setPreview(cat.icon);
    setModal({ open: true, edit: true, data: cat });
  };

  const filteredCategories = categories.sort((a, b) => a.id - b.id);

  return (
    <Layout>
      <div
        className={`fixed top-6 right-6 z-100 transition-transform duration-300 ${
          toast.show
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div
          className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white ${
            toast.type === "success"
              ? "bg-linear-to-r from-green-500 to-green-600"
              : "bg-linear-to-r from-red-500 to-red-600"
          }`}
        >
          <Icon
            icon={
              toast.type === "success"
                ? "mdi:check-circle-outline"
                : "mdi:alert-circle-outline"
            }
            className="w-6 h-6"
          />
          <span className="font-medium">{toast.message}</span>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8 max-w-full mx-auto">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Kategori UMKM</h1>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() =>
                  setModal({ open: true, edit: false, data: null })
                }
                className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition whitespace-nowrap"
              >
                <Icon icon="mdi:plus" className="w-5 h-5" />
                Tambah Kategori
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-40">
            <Icon
              icon="svg-spinners:90-ring-with-bg"
              className="w-16 h-16 text-orange-500"
            />
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col overflow-hidden"
              >
                <div className="p-6 grow">
                  <div className="flex justify-center items-center gap-4">
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-gray-100 shadow-md"
                    />
                    <h3 className="text-xl font-bold text-gray-900">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 h-16 overflow-hidden">
                    {cat.desc || "Tidak ada deskripsi."}
                  </p>
                </div>
                <div className="border-t border-gray-100 bg-gray-50/50 p-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      Total UMKM
                    </span>
                    <span className="text-lg font-bold text-orange-600">
                      {cat.data_umkm?.length || 0}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setUmkmList({ open: true, category: cat })}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
                    >
                      <Icon icon="mdi:eye" className="w-5 h-5" />
                      <span className="text-sm font-medium">Lihat UMKM</span>
                    </button>
                    <button
                      onClick={() => openEdit(cat)}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition"
                    >
                      <Icon icon="mdi:pencil" className="w-5 h-5" />
                      <span className="text-sm font-medium">Edit</span>
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
              Tidak Ada Kategori
            </h3>
            <p className="text-gray-500 mt-2">
              Belum ada kategori yang ditambahkan.
            </p>
          </div>
        )}
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 transform transition-all scale-100 opacity-100">
            <h2 className="text-2xl text-orange font-bold mb-6">
              {modal.edit ? "Edit" : "Tambah"} Kategori
            </h2>
            <form
              onSubmit={modal.edit ? handleUpdate : handleCreate}
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Nama Kategori"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <textarea
                placeholder="Deskripsi (opsional)"
                rows={3}
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Kategori
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="mt-4 w-24 h-24 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition"
                >
                  {modal.edit ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {umkmList.open && umkmList.category && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl text-orange font-bold">
                UMKM di Kategori: {umkmList.category.name}
              </h2>
            </div>
            <div className="p-8 overflow-y-auto bg-gray-50">
              {umkmList.category.data_umkm?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {umkmList.category.data_umkm.map((u) => (
                    <div
                      key={u.id}
                      className="bg-white rounded-xl p-5 hover:shadow-lg transition-shadow border border-gray-200"
                    >
                      <img
                        src={u.hero_image}
                        alt={u.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h4 className="font-bold text-gray-900">{u.name}</h4>
                      <p className="text-sm text-gray-600">{u.kecamatan}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Icon
                          icon="mdi:star"
                          className="w-5 h-5 text-yellow-500"
                        />
                        <span className="font-medium">{u.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-10">
                  Belum ada UMKM di kategori ini.
                </p>
              )}
            </div>
            <div className="p-8 border-t border-gray-200 bg-white rounded-b-2xl">
              <button
                onClick={() => setUmkmList({ open: false, category: null })}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {umkmDetail.open && umkmDetail.data && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-3xl font-bold">{umkmDetail.data.name}</h2>
            </div>
            <div className="p-8 overflow-y-auto bg-gray-50">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <img
                    src={umkmDetail.data.hero_image}
                    alt={umkmDetail.data.name}
                    className="w-full rounded-2xl object-cover h-80"
                  />
                  <div>
                    <h3 className="text-xl font-bold">Deskripsi</h3>
                    <p className="text-gray-700 mt-2">
                      {umkmDetail.data.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold">Tentang</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: umkmDetail.data.about,
                      }}
                      className="text-gray-700 mt-2 prose max-w-none"
                    />
                  </div>

                  {umkmDetail.data.menus?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-3">Menu Populer</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {umkmDetail.data.menus.slice(0, 4).map((m) => (
                          <div
                            key={m.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
                          >
                            <img
                              src={m.image}
                              alt={m.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-semibold">{m.name}</p>
                              <p className="text-sm text-gray-600">{m.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-8 border-t border-gray-200 bg-white rounded-b-2xl">
              <button
                onClick={() => setUmkmDetail({ open: false, data: null })}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
