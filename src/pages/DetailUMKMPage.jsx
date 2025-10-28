import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import { Icon } from "@iconify/react";

const DetailUMKM = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMobilePopup, setShowMobilePopup] = useState(false);

  const menus = [
    {
      name: "Ayam Geprek",
      description: "Ayam goreng tepung dengan sambal pedas khas Kudus.",
      price: "Rp 18.000",
      image: "/images/rambo_menu.png",
    },
    {
      name: "Ayam Bakar Madu",
      description: "Ayam bakar dengan olesan madu manis gurih.",
      price: "Rp 20.000",
      image: "/images/rambo_menu.png",
    },
    {
      name: "Ayam Sambal Korek",
      description: "Pedasnya nampol dengan sambal korek khas Ramboo Chicken.",
      price: "Rp 19.000",
      image: "/images/rambo_menu.png",
    },
    {
      name: "Ayam Crispy",
      description: "Ayam renyah gurih cocok untuk semua kalangan.",
      price: "Rp 17.000",
      image: "/images/rambo_menu.png",
    },
  ];

  const galleryImages = [
    "/images/galerifoto1_rambochicken.png",
    "/images/galerifoto2_rambochicken.png",
    "/images/galerifoto3_rambochicken.png",
    "/images/galerifoto4_rambochicken.png",
    "/images/galerifoto5_rambochicken.png",
  ];

  // === ISI POPUP & SIDEBAR ===
  const StickyInfo = ({ onClose }) => (
    <div className="bg-white rounded-2xl p-5 shadow-xl relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-dark/60 hover:text-dark text-2xl z-10"
        aria-label="Tutup"
      >
        <Icon icon="tabler:x" />
      </button>

      <h3 className="text-[20px] font-bold text-dark mb-3 pr-8">Ramboo Chicken</h3>
      <ul className="text-sm text-dark/70 space-y-3 mb-4">
        <li className="flex items-center gap-2">
          <Icon icon="si:pin-fill" className="text-orange text-lg" />
          Jl. Sunan Muria No.21, Kudus
        </li>
        <li className="flex items-center gap-2">
          <Icon icon="tabler:clock-filled" className="text-green text-lg" />
          09.00 - 21.00 WIB
        </li>
        <li className="flex items-center gap-2">
          <Icon icon="iconoir:star-solid" className="text-yellow-500 text-lg" />
          4.8 / 5
        </li>

        <h3 className="text-[18px] font-bold text-dark mb-3 mt-4">Kontak Kami</h3>
        <li className="flex items-center gap-2">
          <Icon icon="ic:sharp-whatsapp" className="text-orange text-lg" />
          <a
            href="https://wa.me/6289673183625"
            className="text-dark/80 underline hover:text-orange transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            wa.me/6289673183625
          </a>
        </li>
        <li className="flex items-center gap-2">
          <Icon icon="ic:outline-email" className="text-orange text-lg" />
          <a
            href="mailto:ramboo@gmail.com"
            className="text-dark/80 underline hover:text-orange transition-colors"
          >
            ramboo@gmail.com
          </a>
        </li>
        <li className="flex items-center gap-2">
          <Icon icon="mdi:instagram" className="text-orange text-lg" />
          <a
            href="https://instagram.com/ramboochicken"
            className="text-dark/80 underline hover:text-orange transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram.com/ramboochicken
          </a>
        </li>
      </ul>

      <p className="text-dark/70 text-sm leading-relaxed mb-4">
        Ramboo Chicken dikenal dengan ayam geprek dan sambal koreknya yang pedas menggugah selera. Menggunakan bahan segar dan bumbu khas Kudus yang autentik.
      </p>

      <button
        onClick={() => window.open("https://maps.app.goo.gl/xVjQFurMT4EqQVaw6", "_blank")}
        className="w-full bg-orange text-white font-semibold py-2.5 rounded-xl hover:bg-[#d96230] transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Icon icon="mdi:map-search-outline" className="text-lg" />
        Lihat Lokasi di Maps
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-light/50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroContent
        image="/images/rambochicken_hero.png"
        title='Informasi Lengkap tentang UMKM "Ramboo Chicken"'
        subtitle="Nikmati cita rasa ayam geprek khas Kudus dengan berbagai pilihan menu lezat dan harga terjangkau."
      />

      {/* Konten */}
      <PageContainer variant="default">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6">
          
          {/* KONTEN UTAMA */}
          <div className="flex-1 space-y-8 md:space-y-10">
            {/* Tentang UMKM */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">
                Tentang <span className="font-normal text-dark-600">UMKM</span>
              </h2>
              <p className="text-dark/70 leading-relaxed text-justify">
                <strong>Ramboo Chicken</strong> adalah sebuah usaha kuliner populer di Kudus yang berlokasi di daerah Krandon. Tempat makan ini mengkhususkan diri pada sajian aneka hidangan olahan ayam yang beragam, menjadikannya pilihan favorit bagi warga lokal. Menu andalan mereka berfokus pada ayam geprek dan rice bowl dengan berbagai saus khas.
              </p>
            </section>

            {/* Menu — 3 KOLOM DI MOBILE (sama seperti desktop) */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">
                Menu <span className="font-normal text-dark-600">/ Produk Unggulan</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {menus.map((menu, index) => (
                  <div
                    key={index}
                    className="transition-all duration-300 hover:text-orange cursor-pointer group"
                  >
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-full h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold text-dark group-hover:text-orange transition-colors duration-300">
                        {menu.name}
                      </h3>
                      <p className="text-sm text-dark/60 mt-1">{menu.description}</p>
                      <p className="text-orange font-bold mt-2">{menu.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Galeri — Desktop: PERSIS seperti asli */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-dark mb-4">
                Galeri <span className="font-normal text-dark">Foto</span>
              </h2>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* Kolom kiri */}
                <div className="flex flex-col gap-3 md:gap-4">
                  {galleryImages.slice(0, 2).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Galeri ${idx + 1}`}
                      onClick={() => setSelectedImage(img)}
                      className="w-full object-cover rounded-xl md:rounded-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                      style={{
                        height: idx === 0 ? "220px" : "500px",
                        aspectRatio: idx === 0 ? "4/3" : "1/1",
                      }}
                    />
                  ))}
                </div>

                {/* Kolom kanan */}
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 gap-2">
                    {galleryImages.slice(2, 4).map((img, idx) => (
                      <img
                        key={idx + 2}
                        src={img}
                        alt={`Galeri ${idx + 3}`}
                        onClick={() => setSelectedImage(img)}
                        className="w-full object-cover rounded-xl md:rounded-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                        style={{
                          height: idx === 0 ? "140px" : "300px",
                          aspectRatio: "4/3",
                        }}
                      />
                    ))}
                  </div>
                  <img
                    src={galleryImages[4]}
                    alt="Galeri 5"
                    onClick={() => setSelectedImage(galleryImages[4])}
                    className="w-full object-cover rounded-xl md:rounded-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                    style={{
                      height: "280px",
                      aspectRatio: "4/3",
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Google Maps */}
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">
                Temukan <span className="font-normal text-dark">Kami</span>
              </h2>
              <div className="w-full h-[280px] rounded-xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps?q=-6.792574,110.8408274&hl=id&z=15&output=embed"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="border-0 rounded-2xl"
                  title="Lokasi Ramboo Chicken"
                ></iframe>
              </div>
              <p className="mt-3 text-base text-dark leading-relaxed font-normal">
                Jl. KH Moh. Arwani, Pejaten, Krandon, Kec. Kota Kudus, Kabupaten Kudus, Jawa Tengah 59314
              </p>
            </section>
          </div>

          {/* STICKY SIDEBAR (Desktop Only) */}
          <div className="hidden md:block md:w-80">
            <div className="sticky top-28">
              <StickyInfo onClose={() => {}} />
            </div>
          </div>
        </div>
      </PageContainer>

      {/* POPUP GAMBAR */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-pointer"
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-3xl md:hidden"
              aria-label="Tutup"
            >
              <Icon icon="tabler:x" />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] rounded-xl md:rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* FLOATING BUTTON (Mobile Only) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={() => setShowMobilePopup(true)}
          className="bg-gradient-to-r from-orange to-[#d96230] hover:from-[#d96230] hover:to-orange text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          aria-label="Buka info UMKM"
        >
          <Icon icon="mdi:storefront-outline" className="text-2xl" />
        </button>
      </div>

      {/* POPUP CARD (Mobile Only) */}
      {showMobilePopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4" onClick={() => setShowMobilePopup(false)}>
          <div
            className="w-full max-w-md animate-slideUp"
            onClick={(e) => e.stop-stopPropagation()}
          >
            <StickyInfo onClose={() => setShowMobilePopup(false)} />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-15">
        <Footer />
      </div>
    </div>
  );
};

export default DetailUMKM;