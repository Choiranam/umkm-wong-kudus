import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/admin/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaImage } from "react-icons/fa";
import api from "../../API/Auth.js";

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

  const MAX_CONTENT_LENGTH = 2000; // MAKSIMAL 1000 KARAKTER

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
      showToastMessage("Gagal memuat kategori!", "error");
    }
  };

  // === VALIDASI FILE GAMBAR ===
  const validateImage = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return "Format gambar tidak didukung! Gunakan JPG atau PNG.";
    }
    if (file.size > maxSize) {
      return "Ukuran gambar maksimal 5MB!";
    }
    return null;
  };

  // === HANDLE IMAGE CHANGE ===
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

    showToastMessage(`Gambar "${file.name}" siap diupload!`, "success");
  };

  // === HANDLE CONTENT CHANGE (HITUNG KARAKTER) ===
  const handleContentChange = (e) => {
    const text = e.target.value;
    setContentLength(text.length);
  };

  // === HANDLE SUBMIT ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const title = formData.get("title")?.trim();
    const content = formData.get("content")?.trim();

    // Validasi client-side
    if (!title) {
      showToastMessage("Judul wajib diisi!", "error");
      setLoading(false);
      return;
    }
    if (!content) {
      showToastMessage("Isi artikel wajib diisi!", "error");
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
        else if (errors.content) msg = "Isi artikel tidak valid!";
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

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Link
                  to="/artikel-admin"
                  className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
                >
                  <FaArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Tambah Artikel Baru</h1>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Kategori */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category_blog_id"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    maxLength="200"
                    placeholder="Masukkan judul unik..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Judul harus unik</p>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Penulis <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    required
                    placeholder="Nama penulis"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none"
                  />
                </div>

                {/* Gambar + Preview */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gambar <span className="text-red-500">*</span>
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
                    className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange transition text-center"
                  >
                    {imagePreview ? (
                      <div className="space-y-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto max-h-64 rounded-lg shadow-md"
                        />
                        <p className="text-sm text-green-600 font-medium">
                          <FaImage className="inline mr-1" />
                          {imageName}
                        </p>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <FaImage className="mx-auto text-4xl mb-2" />
                        <p>Klik untuk pilih gambar</p>
                        <p className="text-xs mt-1">JPG, PNG, max 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Paragraf - Textarea (Resizable + Batas 1000 Karakter) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Paragraf <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    required
                    placeholder="Tulis isi artikel di sini..."
                    rows="10"
                    maxLength={MAX_CONTENT_LENGTH}
                    onChange={handleContentChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange outline-none resize-vertical"
                    style={{ minHeight: "150px", maxHeight: "500px" }}
                  ></textarea>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Maksimal {MAX_CONTENT_LENGTH} karakter</span>
                    <span
                      className={
                        contentLength > MAX_CONTENT_LENGTH * 0.9 ? "text-red-600" : ""
                      }
                    >
                      {contentLength}/{MAX_CONTENT_LENGTH}
                    </span>
                  </div>
                </div>

                {/* Tombol */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Link
                    to="/artikel-admin"
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 ${
                      loading
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-orange text-white hover:bg-orange-dark"
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
              </form>
            </div>
          </div>
        </main>

        {/* Animation */}
        <style jsx>{`
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