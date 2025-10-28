import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import { Icon } from "@iconify/react";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";

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

    const allFilled = Object.values(reviewData).every(
      (val) => val.trim() !== ""
    );
    if (!allFilled || rating === 0) {
      setErrorReview(
        "⚠️ Semua kolom dan rating wajib diisi sebelum mengirim penilaian."
      );
      return;
    }

    setErrorReview("");
    // Ganti alert dengan modal custom jika tersedia di proyek Anda
    alert("Terima kasih atas penilaianmu! ⭐");
  };

  return (
    <div className="bg-light min-h-screen">
      <Navbar />
      <HeroContent
        image="/images/hero_content_kontak.png"
        title="Hubungi Kami untuk Info Lebih Lanjut"
        subtitle="Jangan ragu untuk menghubungi kami agar kami dapat membantu Anda dengan informasi yang Anda butuhkan."
      />

      {/* EDIT 1: 
        - Mengurangi padding vertikal (py) di mobile menjadi 'py-8' (dari 14)
        - Mengurangi celah (gap) di mobile menjadi 'gap-8' (dari 12)
        - Tetap menggunakan 'md:py-14' dan 'md:gap-12' untuk desktop
      */}
      <PageContainer
        variant="default"
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-start py-8 md:py-14"
      >
        {/* Bagian Hubungi Kami */}
        <div className="space-y-12">
          {/* Form Hubungi Kami */}
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
                      />
                      <label
                        htmlFor={label}
                        className={`absolute left-0 transition-all duration-200 ease-in-out
                          ${formData[label]
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
                        className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px] leading-relaxed overflow-hidden"
                        placeholder=" "
                      ></textarea>
                      <label
                        htmlFor={label}
                        className={`absolute left-0 transition-all duration-200 ease-in-out
                          ${formData[label]
                            ? "-top-2 text-xs text-dark"
                            : "top-2 text-sm text-dark/50"
                          }
                          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
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
                className="bg-orange text-light py-2.5 w-full rounded-md uppercase font-semibold tracking-wide transition-all duration-300
                hover:bg-[#D96230] hover:scale-[1.03] hover:shadow-md hover:shadow-orange/30 active:scale-[0.97] cursor-pointer"
              >
                Kirim Pesan
              </button>
            </form>

            {/* Ikon sosial media */}
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

        {/* EDIT 2:
          - Mengubah tinggi (height) di mobile menjadi 'h-[350px]' (dari 550px)
          - Tetap menggunakan 'md:h-[550px]' untuk desktop
        */}
        <div className="overflow-hidden rounded-[5px] shadow-md h-[350px] md:h-[550px]">
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

        {/* EDIT 3 (MODIFIKASI SENPAI):
          - Menambahkan 'hidden md:block' untuk hide di mobile, tampil di md+
          - Mengubah tinggi (height) di mobile menjadi 'h-[350px]' (dari 530px)
          - Tetap menggunakan 'md:h-[530px]' untuk desktop
        */}
        <div className="rounded-[5px] overflow-hidden shadow-md h-[350px] md:h-[530px] hidden md:block">
          <img
            src="/images/kudus.jpg"
            alt="Kudus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Beri Penilaian */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-dark">
            Beri Penilaian
          </h2>
          <p className="text-dark/80 mb-8 text-base leading-relaxed">
            Berikan bintang dan komentar tentang pengalamanmu saat menjelajahi
            website ini.
          </p>

          <form onSubmit={handleReviewSubmit} className="space-y-6">
            {/* EDIT 4:
              - Mengubah flex direction menjadi 'flex-col' di mobile
              - Mengembalikan ke 'sm:flex-row' di layar 'sm' (small) ke atas
            */}
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

              {/* EDIT 5:
                - Menambah 'w-full' agar input nama mengambil lebar penuh di mobile
                - Menambah 'sm:w-auto' untuk mengembalikan ke lebar otomatis di layar 'sm' ke atas (agar 'flex-1' bisa berfungsi)
              */}
              <div className="flex flex-col flex-1 gap-4 w-full sm:w-auto">
                {["Nama Depan", "Nama Belakang"].map((label) => (
                  <div key={label} className="relative">
                    <input
                      type="text"
                      id={`review-${label}`}
                      value={reviewData[label]}
                      onChange={(e) => handleReviewChange(label, e.target.value)}
                      className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px]"
                      placeholder=" "
                    />
                    <label
                      htmlFor={`review-${label}`}
                      className={`absolute left-0 transition-all duration-200 ease-in-out ${reviewData[label]
                        ? "-top-2 text-xs text-dark"
                        : "top-2 text-sm text-dark/50"
                        } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
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
                className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px]"
                placeholder=" "
              />
              <label
                htmlFor="review-email"
                className={`absolute left-0 transition-all duration-200 ease-in-out ${reviewData.Email
                  ? "-top-2 text-xs text-dark"
                  : "top-2 text-sm text-dark/50"
                  } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
              >
                Email <span className="text-orange">*</span>
              </label>
            </div>

            {/* Rating */}
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
                    className={`text-[1.8rem] transition-transform hover:scale-110 ${num <= rating ? "text-yellow" : "text-dark/50"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Pesan */}
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
                className="peer w-full border-b border-dark/40 bg-transparent focus:outline-none py-2 text-[15px] leading-relaxed overflow-hidden"
                placeholder=" "
              ></textarea>
              <label
                htmlFor="review-pesan"
                className={`absolute left-0 transition-all duration-200 ease-in-out
                ${reviewData.Pesan
                    ? "-top-2 text-xs text-dark"
                    : "top-2 text-sm text-dark/50"
                  }
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange`}
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
              className="bg-orange text-light py-2.5 w-full rounded-md uppercase font-semibold tracking-wide transition-all duration-300
              hover:bg-[#D96230] hover:scale-[1.03] hover:shadow-md hover:shadow-orange/30 active:scale-[0.97] cursor-pointer"
            >
              Kirim Penilaian
            </button>
          </form>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default KontakPage;