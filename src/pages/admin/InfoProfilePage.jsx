import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/admin/layout/Layout";
import api from "../../services/api.js";
export default function InfoProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const fileInputRef = useRef(null);
  const API_USER = "/user";
  const API_UPDATE = "/user/update";
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(API_USER);
      if (res.data.status) {
        const user = res.data.data;
        setName(user.name);
        setEmail(user.email);
        setPhotoUrl(user.foto_profil || "");
      }
    } catch (err) {
      showToast("Gagal memuat data profil", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageChange = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran maksimal 5MB!", "error");
      return;
    }
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type)) {
      showToast("Format harus JPG, PNG, atau SVG!", "error");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPhotoUrl(reader.result);
    reader.readAsDataURL(file);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Nama wajib diisi!", "error");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    if (fileInputRef.current?.files[0]) {
      formData.append("foto_profil", fileInputRef.current.files[0]);
    }
    setIsLoading(true);
    try {
      const res = await api.post(API_UPDATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.status) {
        showToast("Profil berhasil diperbarui!", "success");
        await fetchUser();
        window.dispatchEvent(new Event("userUpdated"));
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Gagal memperbarui profil";
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };
  const showToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Account Information
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Perbarui Foto Profil dan Informasi anda disini
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-orange text-white rounded-xl hover:bg-orange-dark font-medium transition flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Foto Profil mu
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Akan di display di pojok kanan atas dashboard
                </p>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
                    isDragging
                      ? "border-orange bg-orange-50"
                      : "border-gray-300"
                  }`}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                  <p className="mt-4 text-sm font-medium text-orange">
                    {isDragging
                      ? "Lepaskan untuk upload"
                      : "Klik untuk upload atau seret ke sini"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    SVG, PNG, JPG ( MAX 800 x 800 px )
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageChange(e.target.files[0])}
                    accept="image/svg+xml,image/png,image/jpeg,image/jpg"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 text-sm text-orange hover:text-orange-dark underline"
                  >
                    Pilih File
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition"
                    placeholder="Masukkan nama"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Email tidak dapat diubah
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {toast.show && (
          <div
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-pulse z-50 ${
              toast.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                toast.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {toast.type === "success" ? "Check" : "X"}
            </div>
            <span className="font-medium">{toast.message}</span>
          </div>
        )}
      </div>
    </Layout>
  );
}
