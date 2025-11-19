import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/admin/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaImage } from "react-icons/fa";
import api from "../../services/api.js";

export default function CreateArtikelPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("Belum ada gambar dipilih");
  const [contentLength, setContentLength] = useState(0);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const API_ARTIKEL = "https://api-umkmwongkudus.rplrus.com/api/articles";
  const API_KATEGORI = "https://api-umkmwongkudus.rplrus.com/api/categories-blog";

  const MAX_CONTENT_LENGTH = 2000;

  // === TOAST ===
  const showToastMessage = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // === GET TOKEN ===
  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // === FETCH KATEGORI ===
  const fetchCategories = async () => {
    try {
      const res = await api.get(API_KATEGORI);
      if (res.data.status) setCategories(res.data.data);
    } catch (err) {
      showToastMessage("Gagal memuat kategori!", "error");
    }
  };

  // === VALIDASI GAMBAR ===
  const validateImage = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!validTypes.includes(file.type))
      return "Format gambar tidak didukung! Gunakan JPG atau PNG.";
    if (file.size > maxSize) return "Ukuran gambar maksimal 5MB!";
    return null;
  };

  // === HANDLE IMAGE ===
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      showToastMessage(error, "error");
      e.target.value = null;
      setImagePreview(null);
      setImageName("Belum ada gambar dipilih");
      return;
    }

    setImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    showToastMessage(`Gambar "${file.name}" berhasil dipilih`, "success");
  };

  // === HITUNG KARAKTER ===
  const handleContentChange = (e) => {
    setContentLength(e.target.value.length);
  };

  // === SUBMIT ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const title = formData.get("title")?.trim();
    const content = formData.get("content")?.trim();

    if (!title || !content) {
      showToastMessage("Judul dan isi artikel wajib diisi!", "error");
      setLoading(false);
      return;
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      showToastMessage(`Isi artikel maksimal ${MAX_CONTENT_LENGTH} karakter!`, "error");
      setLoading(false);
      return;
    }
    if (!imagePreview) {
      showToastMessage("Gambar wajib diunggah!", "error");
      setLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      showToastMessage("Token tidak ditemukan! Silakan login ulang.", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(API_ARTIKEL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status) {
        showToastMessage("Artikel berhasil ditambahkan!", "success");
        setTimeout(() => navigate("/artikel-admin"), 1500);
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      let msg = "Gagal menyimpan artikel!";

      if (errors) {
        if (errors.title) msg = "Judul artikel sudah digunakan!";
        else if (errors.image) msg = "Gambar gagal diupload!";
        else msg = Object.values(errors)[0][0];
      } else {
        msg = err.response?.data?.message || msg;
      }
      showToastMessage(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">

            {/* Toast */}
            {showToast && (
              <div
                className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-pulse ${
                  toastType === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    toastType === "success" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {toastType === "success" ? "Check" : "X"}
                </div>
                <span className="font-medium">{toastMessage}</span>
              </div>
            )}

            {/* HEADER – persis seperti contoh yang kamu kasih */}
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Link
                    to="/artikel-admin"
                    className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    <FaArrowLeft className="w-5 h-5 text-gray-700" />
                  </Link>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Tambah Artikel Baru
                  </h1>
                </div>

                <div className="flex gap-3">
                  <button
                    form="formArtikel"
                    type="submit"
                    disabled={loading}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Artikel"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* FORM CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <form id="formArtikel" onSubmit={handleSubmit} className="p-6 md:p-8 space-y-7">

                {/* Kategori */}
                <div>
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category_blog_id"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Judul */}
                <div>
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                    Judul Artikel <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    maxLength="200"
                    placeholder="Masukkan judul yang unik dan menarik..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                  <p className="text-xs text-left text-gray-500 mt-1">Maksimal 200 karakter • Harus unik</p>
                </div>

                {/* Penulis */}
                <div>
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                    Penulis <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    required
                    placeholder="Nama penulis artikel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>

                {/* Upload Gambar */}
                <div>
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                    Gambar Utama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg,image/jpg,image/png"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-orange-400 hover:bg-orange-50/30 transition cursor-pointer text-center"
                  >
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto max-h-80 rounded-lg shadow-lg object-cover"
                        />
                        <p className="text-sm font-medium text-green-600">
                          <FaImage className="inline mr-1" />
                          {imageName}
                        </p>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <FaImage className="mx-auto text-5xl mb-3 text-gray-400" />
                        <p className="font-medium">Klik untuk upload gambar</p>
                        <p className="text-xs mt-1">JPG / PNG • Maksimal 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Isi Artikel */}
                <div>
                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                    Isi Artikel <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    required
                    rows="12"
                    maxLength={MAX_CONTENT_LENGTH}
                    onChange={handleContentChange}
                    placeholder="Tulis konten artikel di sini..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-vertical transition"
                    style={{ minHeight: "200px" }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Maksimal {MAX_CONTENT_LENGTH} karakter</span>
                    <span className={contentLength > MAX_CONTENT_LENGTH * 0.9 ? "text-red-600 font-medium" : ""}>
                      {contentLength} / {MAX_CONTENT_LENGTH}
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}