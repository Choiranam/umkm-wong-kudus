import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import { Icon } from "@iconify/react";

const KontakPage = () => {
  // ==== Hubungi Kami ====
  const [formData, setFormData] = useState({
    "Nama Depan": "",
    "Nama Belakang": "",
    "Nomor Telepon": "",
    Email: "",
    Pesan: "",
  });
  const [errorHubungi, setErrorHubungi] = useState("");

  const handleChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");

    if (!allFilled) {
      setErrorHubungi("⚠️ Semua kolom wajib diisi sebelum mengirim pesan.");
      return;
    }

    setErrorHubungi("");

    const subject = encodeURIComponent(
      `Pesan dari ${formData["Nama Depan"]} ${formData["Nama Belakang"]}`
    );
    const body = encodeURIComponent(
      `Halo, saya ${formData["Nama Depan"]} ${formData["Nama Belakang"]}\n\n` +
        `Nomor Telepon: ${formData["Nomor Telepon"]}\n` +
        `Email: ${formData["Email"]}\n\n` +
        `Pesan:\n${formData["Pesan"]}`
    );

    window.location.href = `mailto:mchoiranam@gmail.com?subject=${subject}&body=${body}`;
  };

  // ==== Beri Penilaian ====
  const [rating, setRating] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [reviewData, setReviewData] = useState({
    "Nama Depan": "",
    "Nama Belakang": "",
    Email: "",
    Pesan: "",
  });
  const [errorReview, setErrorReview] = useState("");

  const handleReviewChange = (label, value) => {
    setReviewData({ ...reviewData, [label]: value });
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const allFilled = Object.values(reviewData).every((val) => val.trim() !== "");
    if (!allFilled || rating === 0) {
      setErrorReview("⚠️ Semua kolom dan rating wajib diisi sebelum mengirim penilaian.");
      return;
    }

    setErrorReview("");
    alert("Terima kasih atas penilaianmu! ⭐");
  };

  return (
    <div className="bg-light min-h-screen font-poppins">
      <Navbar />
      <HeroContent
        image="/images/hero_content_kontak.png"
        title="Hubungi Kami untuk Info Lebih Lanjut"
        subtitle="Jangan ragu untuk menghubungi kami agar kami dapat membantu Anda dengan informasi yang Anda butuhkan."
      />

      {/* ===== Hubungi Kami ===== */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-stretch">
        {/* Form */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-black mb-3 text-dark">Hubungi Kami</h2>
            <p className="text-dark font-normal mb-10">
              Dukungan dan saran Anda sangat berarti bagi perkembangan UMKM di Kudus.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {Object.keys(formData).map((label, index) => (
                <div key={index} className="relative">
                  {label !== "Pesan" ? (
                    <>
                      <input
                        type={label === "Email" ? "email" : "text"}
                        id={label}
                        value={formData[label]}
                        onChange={(e) => handleChange(label, e.target.value)}
                        className="peer w-full border-b border-dark/50 bg-transparent focus:outline-none py-3"
                      />
                      <label
                        htmlFor={label}
                        className={`absolute left-0 text-dark/50 transition-all duration-200 ease-in-out
                          ${
                            formData[label]
                              ? "top-[-10px] text-sm text-dark"
                              : "top-3 text-base text-dark/50"
                          }
                          peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-orange
                        `}
                      >
                        {label} <span className="text-orange">*</span>
                      </label>
                    </>
                  ) : (
                    <>
                      <textarea
                        id={label}
                        rows="3"
                        value={formData[label]}
                        onChange={(e) => handleChange(label, e.target.value)}
                        className="peer w-full border-b border-dark/50 bg-transparent focus:outline-none py-3 resize-y"
                      ></textarea>
                      <label
                        htmlFor={label}
                        className={`absolute left-0 text-dark/50 transition-all duration-200 ease-in-out
                          ${
                            formData[label]
                              ? "top-[-10px] text-sm text-dark"
                              : "top-3 text-base text-dark/50"
                          }
                          peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-orange
                        `}
                      >
                        {label} <span className="text-orange">*</span>
                      </label>
                    </>
                  )}
                </div>
              ))}

              {errorHubungi && (
                <p className="text-red-500 text-sm text-center font-medium -mt-2">
                  {errorHubungi}
                </p>
              )}

              <button
                type="submit"
                className="bg-orange text-light py-3 w-full rounded-[5px] uppercase font-semibold transition-all duration-300 cursor-pointer
                  hover:bg-[#D96230] hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97]"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Ikon sosial media */}
          <div className="flex justify-center space-x-5 mt-8 text-orange text-3xl">
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
                className="cursor-pointer transition-all duration-300 transform
                  hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97]"
              >
                <Icon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Google Maps */}
        <div className="overflow-hidden shadow-md h-full">
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
      </div>

      {/* ===== Beri Penilaian ===== */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-stretch">
        {/* Gambar kiri */}
        <div className="rounded-xl overflow-hidden shadow-lg h-full">
          <img
            src="/images/kudus.jpg"
            alt="Kudus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form kanan */}
        <div>
          <h2 className="text-4xl font-black mb-3 text-dark">Beri Penilaian</h2>
          <p className="text-dark font-normal mb-10">
            Berikan bintang dan komentar tentang pengalamanmu saat menjelajahi website ini.
          </p>

          <form onSubmit={handleReviewSubmit} className="space-y-6">
            {/* Foto profil */}
            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40 rounded-full border-2 border-orange overflow-hidden bg-light hover:bg-orange/10 transition shrink-0">
                {profilePic ? (
                  <img src={profilePic} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col justify-center items-center h-full text-orange text-center px-3">
                    <Icon icon="mdi:camera-outline" className="text-4xl mb-2" />
                    <p className="text-xs font-medium leading-tight">Tambahkan Foto Profil</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <div className="flex flex-col flex-1 gap-6">
                {["Nama Depan", "Nama Belakang"].map((label) => (
                  <div key={label} className="relative">
                    <input
                      type="text"
                      id={`review-${label}`}
                      value={reviewData[label]}
                      onChange={(e) => handleReviewChange(label, e.target.value)}
                      className="peer w-full border-b border-dark/50 bg-transparent focus:outline-none py-2"
                    />
                    <label
                      htmlFor={`review-${label}`}
                      className={`absolute left-0 text-dark/50 transition-all duration-200 ease-in-out ${
                        reviewData[label]
                          ? "top-[-10px] text-sm text-dark"
                          : "top-2 text-base text-dark/50"
                      } peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-orange`}
                    >
                      {label} <span className="text-orange">*</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="review-email"
                value={reviewData.Email}
                onChange={(e) => handleReviewChange("Email", e.target.value)}
                className="peer w-full border-b border-dark/50 bg-transparent focus:outline-none py-2"
              />
              <label
                htmlFor="review-email"
                className={`absolute left-0 text-dark/50 transition-all duration-200 ease-in-out ${
                  reviewData.Email
                    ? "top-[-10px] text-sm text-dark"
                    : "top-2 text-base text-dark/50"
                } peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-orange`}
              >
                Email <span className="text-orange">*</span>
              </label>
            </div>

            {/* Rating */}
            <div>
              <label className="text-dark font-medium block mb-2">
                Rating Kamu <span className="text-orange">*</span>
              </label>
              <div className="flex space-x-2 cursor-pointer">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Icon
                    key={num}
                    icon="material-symbols-light:star"
                    onClick={() => setRating(num)}
                    className={`text-[2.2rem] transition-transform hover:scale-110 ${
                      num <= rating ? "text-yellow" : "text-black/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Pesan */}
            <div className="relative">
              <textarea
                id="review-pesan"
                rows="3"
                value={reviewData.Pesan}
                onChange={(e) => handleReviewChange("Pesan", e.target.value)}
                className="peer w-full border-b border-dark/50 bg-transparent focus:outline-none py-3 resize-y"
              ></textarea>
              <label
                htmlFor="review-pesan"
                className={`absolute left-0 text-dark/50 transition-all duration-200 ease-in-out ${
                  reviewData.Pesan
                    ? "top-[-10px] text-sm text-dark"
                    : "top-3 text-base text-dark/50"
                } peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-orange`}
              >
                Pesan <span className="text-orange">*</span>
              </label>
            </div>

            {errorReview && (
              <p className="text-red-500 text-sm text-center font-medium -mt-2">
                {errorReview}
              </p>
            )}

            <button
              type="submit"
              className="bg-orange text-light py-3 w-full rounded-[5px] uppercase font-semibold transition-all duration-300 cursor-pointer
              hover:bg-[#D96230] hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KontakPage;
