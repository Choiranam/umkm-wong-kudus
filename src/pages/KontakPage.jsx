import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import { Icon } from "@iconify/react";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";

const KontakPage = () => {
  const [formData, setFormData] = useState({
    "Nama Depan": "",
    "Nama Belakang": "",
    "Nomor Telepon": "",
    Email: "",
    Pesan: "",
  });
  const [errorHubungi, setErrorHubungi] = useState("");
  const [successHubungi, setSuccessHubungi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const MAX_PESAN_LENGTH = 500;

  const handleChange = (label, value) => {
    if (label === "Pesan" && value.length > MAX_PESAN_LENGTH) {
      value = value.slice(0, MAX_PESAN_LENGTH);
    }
    setFormData({ ...formData, [label]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");
    if (!allFilled) {
      setErrorHubungi("Semua kolom wajib diisi sebelum mengirim pesan.");
      setSuccessHubungi("");
      return;
    }
    setErrorHubungi("");
    setSuccessHubungi("");
    setIsLoading(true);
    const payload = {
      sender_name: formData["Nama Depan"].trim(),
      sender_name_last: formData["Nama Belakang"].trim(),
      sender_email: formData.Email.trim(),
      no_telepon: formData["Nomor Telepon"].trim(),
      message: formData.Pesan.trim(),
    };
    try {
      const response = await fetch(
        "https://api-umkmwongkudus.rplrus.com/api/contact/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (response.ok && result.status) {
        setSuccessHubungi(
          "Pesan berhasil dikirim! Kami akan segera menghubungi Anda."
        );
        setFormData({
          "Nama Depan": "",
          "Nama Belakang": "",
          "Nomor Telepon": "",
          Email: "",
          Pesan: "",
        });
        setTimeout(() => setSuccessHubungi(""), 5000);
      } else {
        setErrorHubungi(
          result.message || "Gagal mengirim pesan. Silakan coba lagi."
        );
      }
    } catch {
      setErrorHubungi(
        "Terjadi kesalahan jaringan. Periksa koneksi internet Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const [rating, setRating] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [reviewData, setReviewData] = useState({
    "Nama Depan": "",
    "Nama Belakang": "",
    Email: "",
    Pesan: "",
  });
  const [errorReview, setErrorReview] = useState("");
  const [successReview, setSuccessReview] = useState("");
  const [isLoadingReview, setIsLoadingReview] = useState(false);

  const MAX_KOMENTAR_LENGTH = 300;

  const handleReviewChange = (label, value) => {
    if (label === "Pesan" && value.length > MAX_KOMENTAR_LENGTH) {
      value = value.slice(0, MAX_KOMENTAR_LENGTH);
    }
    setReviewData({ ...reviewData, [label]: value });
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorReview("Ukuran foto terlalu besar. Maksimal 5MB.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setErrorReview("Hanya file gambar yang diperbolehkan.");
        return;
      }
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file));
      setErrorReview("");
    }
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const generateAvatar = (firstName, lastName) => {
    const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#E9743B";
    ctx.fillRect(0, 0, 128, 128);
    ctx.font = "bold 60px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, 64, 64);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], `${initials}.webp`, { type: "image/png" });
        resolve(file);
      });
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const nameFirst = reviewData["Nama Depan"].trim();
    const nameLast = reviewData["Nama Belakang"].trim();
    const email = reviewData.Email.trim();
    const comment = reviewData.Pesan.trim();
    if (!nameFirst || !nameLast || !email || !comment || rating === 0) {
      setErrorReview(
        "Semua kolom nama, email, rating, dan komentar wajib diisi."
      );
      setSuccessReview("");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorReview("Format email tidak valid. Contoh: example@gmail.com");
      setSuccessReview("");
      return;
    }
    if (rating < 1 || rating > 5) {
      setErrorReview("Rating harus antara 1-5 bintang.");
      setSuccessReview("");
      return;
    }
    if (comment.length < 5) {
      setErrorReview("Komentar minimal 5 karakter.");
      setSuccessReview("");
      return;
    }
    setErrorReview("");
    setSuccessReview("");
    setIsLoadingReview(true);
    const formDataPayload = new FormData();
    formDataPayload.append("name", nameFirst);
    formDataPayload.append("name_last", nameLast);
    formDataPayload.append("email", email);
    formDataPayload.append("rating", rating);
    formDataPayload.append("comment", comment);
    if (selectedFile) {
      formDataPayload.append("photo_profil", selectedFile);
    } else if (nameFirst && nameLast) {
      const avatarFile = await generateAvatar(nameFirst, nameLast);
      formDataPayload.append("photo_profil", avatarFile);
    }
    try {
      const response = await fetch(
        "https://api-umkmwongkudus.rplrus.com/api/rating",
        { method: "POST", body: formDataPayload }
      );
      const result = await response.json();
      if (response.ok && result.status) {
        setSuccessReview(
          "Penilaian berhasil dikirim! Terima kasih atas feedback Anda."
        );
        setRating(0);
        setSelectedFile(null);
        setProfilePic(null);
        setReviewData({
          "Nama Depan": "",
          "Nama Belakang": "",
          Email: "",
          Pesan: "",
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
        setTimeout(() => setSuccessReview(""), 5000);
      } else {
        if (response.status === 422 && result.errors) {
          const errorMsg = Object.values(result.errors).flat().join(", ");
          setErrorReview(`Validasi gagal: ${errorMsg}`);
        } else {
          setErrorReview(
            result.message ||
              `Gagal mengirim penilaian (Status: ${response.status}). Silakan coba lagi.`
          );
        }
      }
    } catch {
      setErrorReview(
        "Terjadi kesalahan jaringan. Periksa koneksi internet Anda."
      );
    } finally {
      setIsLoadingReview(false);
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#review") {
      const reviewSection = document.getElementById("review");
      if (reviewSection) {
        setTimeout(() => {
          const yOffset = -100;
          const y =
            reviewSection.getBoundingClientRect().top +
            window.scrollY +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  const pesanRef = useRef(null);
  const reviewPesanRef = useRef(null);

  useEffect(() => {
    if (pesanRef.current) {
      pesanRef.current.style.height = "auto";
      pesanRef.current.style.height = `${pesanRef.current.scrollHeight}px`;
    }
  }, [formData.Pesan]);

  useEffect(() => {
    if (reviewPesanRef.current) {
      reviewPesanRef.current.style.height = "auto";
      reviewPesanRef.current.style.height = `${reviewPesanRef.current.scrollHeight}px`;
    }
  }, [reviewData.Pesan]);

  return (
    <div className="bg-light min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <HeroContent
        image="/images/hero_content_kontak.webp"
        title="Hubungi Kami untuk Info Lebih Lanjut"
        subtitle="Jangan ragu untuk menghubungi kami agar kami dapat membantu Anda dengan informasi yang Anda butuhkan."
      />
      <PageContainer
        variant="default"
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-start py-8 md:py-14"
      >
        <div className="space-y-12" data-aos="fade-right">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-2">
              Hubungi Kami
            </h2>
            <p className="text-dark/80 mb-8 text-base leading-relaxed">
              Dukungan dan saran Anda sangat berarti bagi perkembangan UMKM di
              Kudus.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.keys(formData).map((label, index) => (
                <div key={index} className="relative">
                  {label !== "Pesan" ? (
                    <>
                      <input
                        type={label === "Email" ? "email" : "text"}
                        id={label}
                        value={formData[label]}
                        onChange={(e) => handleChange(label, e.target.value)}
                        className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px]"
                        placeholder=" "
                        disabled={isLoading}
                      />
                      <label
                        htmlFor={label}
                        className={`absolute left-0 transition-all duration-200 ease-in-out
                          ${
                            formData[label]
                              ? "-top-2 text-xs text-dark"
                              : "top-2 text-sm text-dark/50"
                          }
                          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
                      >
                        {label} <span className="text-orange">*</span>
                      </label>
                    </>
                  ) : (
                    <>
                      <textarea
                        id={label}
                        rows="1"
                        value={formData[label]}
                        onChange={(e) => handleChange(label, e.target.value)}
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        ref={pesanRef}
                        maxLength={MAX_PESAN_LENGTH}
                        className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px] leading-relaxed overflow-hidden resize-none"
                        placeholder=" "
                        disabled={isLoading}
                      ></textarea>
                      <label
                        htmlFor={label}
                        className={`absolute left-0 transition-all duration-200 ease-in-out
                          ${
                            formData[label]
                              ? "-top-2 text-xs text-dark"
                              : "top-2 text-sm text-dark/50"
                          }
                          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
                      >
                        {label} <span className="text-orange">*</span>
                      </label>
                      <p className="text-sm text-dark/70 mt-1 text-right">
                        {formData[label].length}/{MAX_PESAN_LENGTH}
                      </p>
                    </>
                  )}
                </div>
              ))}
              {errorHubungi && (
                <p className="text-red-500 text-sm text-center font-medium -mt-2">
                  {errorHubungi}
                </p>
              )}
              {successHubungi && (
                <p className="text-green-600 text-sm text-center font-medium -mt-2 animate-pulse">
                  {successHubungi}
                </p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-orange text-light py-2.5 w-full rounded-md uppercase font-semibold tracking-wide transition-all duration-300
                  hover:bg-[#D96230] hover:scale-[1.03] hover:shadow-md hover:shadow-orange/30 active:scale-[0.97] cursor-pointer
                  ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
            <div className="flex justify-center space-x-4 mt-8 text-orange text-2xl">
              {[
                {
                  href: "mailto:mchoiranam@gmail.com",
                  icon: "streamline-logos:email-logo-block",
                },
                {
                  href: "https://wa.me/6285601211156",
                  icon: "fa6-brands:square-whatsapp",
                },
                {
                  href: "https://www.instagram.com/choiranamm/",
                  icon: "fa7-brands:instagram-square",
                },
                {
                  href: "https://t.me/choiranamm",
                  icon: "streamline-logos:telegram-logo-2-block",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-110 hover:text-[#D96230]"
                >
                  <Icon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-[5px] shadow-md h-[350px] md:h-[550px]"
          data-aos="fade-left"
        >
          <iframe
            src="https://www.google.com/maps?q=-6.792803,110.836430&hl=id&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          />
        </div>

        <div
          className="rounded-[5px] overflow-hidden shadow-md h-[350px] md:h-[530px] hidden md:block"
          data-aos="fade-right"
        >
          <img
            src="/images/kudus.webp"
            alt="Kudus"
            className="w-full h-full object-cover"
          />
        </div>

        <div id="review" data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-dark">
            Beri Penilaian
          </h2>
          <p className="text-dark/80 mb-8 text-base leading-relaxed">
            Berikan bintang dan komentar tentang pengalamanmu saat menjelajahi
            website ini.
          </p>
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-28 h-28 rounded-full border-2 border-orange overflow-hidden bg-light hover:bg-orange/10 transition shrink-0">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center h-full text-orange">
                    <Icon icon="mdi:camera-outline" className="text-3xl mb-1" />
                    <p className="text-[10px] font-medium">Tambah Foto</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex flex-col flex-1 gap-4 w-full sm:w-auto">
                {["Nama Depan", "Nama Belakang"].map((label) => (
                  <div key={label} className="relative">
                    <input
                      type="text"
                      id={`review-${label}`}
                      value={reviewData[label]}
                      onChange={(e) =>
                        handleReviewChange(label, e.target.value)
                      }
                      maxLength={30}
                      className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px]"
                      placeholder=" "
                      disabled={isLoadingReview}
                    />

                    <label
                      htmlFor={`review-${label}`}
                      className={`absolute left-0 transition-all duration-200 ease-in-out
                        ${
                          reviewData[label]
                            ? "-top-2 text-xs text-dark"
                            : "top-2 text-sm text-dark/50"
                        }
                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
                    >
                      {label} <span className="text-orange">*</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <input
                type="email"
                id="review-email"
                value={reviewData.Email}
                onChange={(e) => handleReviewChange("Email", e.target.value)}
                className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px]"
                placeholder=" "
                disabled={isLoadingReview}
              />
              <label
                htmlFor="review-email"
                className={`absolute left-0 transition-all duration-200 ease-in-out
                  ${
                    reviewData.Email
                      ? "-top-2 text-xs text-dark"
                      : "top-2 text-sm text-dark/50"
                  }
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
              >
                Email <span className="text-orange">*</span>
              </label>
            </div>

            <div>
              <label className="text-dark font-medium block mb-1">
                Rating Kamu <span className="text-orange">*</span>
              </label>
              <div className="flex space-x-1 cursor-pointer">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Icon
                    key={num}
                    icon="material-symbols-light:star"
                    onClick={() => setRating(num)}
                    className={`text-[1.8rem] transition-transform hover:scale-110
                      ${num <= rating ? "text-yellow" : "text-dark/50"}`}
                  />
                ))}
              </div>
              {rating > 0 && (
                <p className="text-xs text-dark/70 mt-1">Rating: {rating}/5</p>
              )}
            </div>

            <div className="relative">
              <textarea
                id="review-pesan"
                rows="1"
                value={reviewData.Pesan}
                onChange={(e) => handleReviewChange("Pesan", e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                ref={reviewPesanRef}
                maxLength={MAX_KOMENTAR_LENGTH}
                className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px] leading-relaxed overflow-hidden resize-none"
                placeholder=" "
                disabled={isLoadingReview}
              ></textarea>
              <label
                htmlFor="review-pesan"
                className={`absolute left-0 transition-all duration-200 ease-in-out
                  ${
                    reviewData.Pesan
                      ? "-top-2 text-xs text-dark"
                      : "top-2 text-sm text-dark/50"
                  }
                  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
              >
                Komentar <span className="text-orange">*</span>
              </label>
              <p className="text-sm text-dark/70 mt-1 text-right">
                {reviewData.Pesan.length}/{MAX_KOMENTAR_LENGTH}
              </p>
            </div>

            {errorReview && (
              <p className="text-red-500 text-sm text-center font-medium -mt-2 bg-red-50 p-2 rounded">
                {errorReview}
              </p>
            )}
            {successReview && (
              <p className="text-green-600 text-sm text-center font-medium -mt-2 bg-green-50 p-2 rounded animate-pulse">
                {successReview}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoadingReview}
              className={`bg-orange text-light py-2.5 w-full rounded-md uppercase font-semibold tracking-wide transition-all duration-300
                hover:bg-[#D96230] hover:scale-[1.03] hover:shadow-md hover:shadow-orange/30 active:scale-[0.97] cursor-pointer
                ${isLoadingReview ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoadingReview ? "Mengirim..." : "Kirim Penilaian"}
            </button>
          </form>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default KontakPage;
