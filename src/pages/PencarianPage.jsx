import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import UMKMCard from "../components/UMKMCard";
import { Icon } from "@iconify/react";
import PageContainer from "../components/PageContainer";

const PencarianPage = () => {
  // Data hasil pencarian
  const hasilPencarian = [
    {
      name: "Ramboo Chicken",
      category: "Makanan",
      description:
        "Ramboo Chicken Kudus merupakan usaha kuliner yang menyajikan beragam olahan ayam khas.",
      location: "Kota Kudus",
      openHour: "10.00–21.00",
      image: "/images/sampel_umkm.png",
    },
    {
      name: "Ramboo Chicken",
      category: "Makanan",
      description:
        "Ramboo Chicken Kudus merupakan usaha kuliner yang menyajikan beragam olahan ayam khas.",
      location: "Kota Kudus",
      openHour: "10.00–21.00",
      image: "/images/sampel_umkm.png",
    },
  ];

  const keyword = "Ra"; // Contoh keyword

  return (
    <div className="bg-light min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <HeroContent
        image="/images/pencarian_hero_content.png"
        title="Temukan berbagai usaha lokal sesuai kata kunci pilihanmu."
        subtitle="Dukung pelaku UMKM lokal dan temukan produk, layanan, serta kuliner pilihan di Kudus."
      />

      {/* ===== Hasil Pencarian ===== */}
      {/* PENYESUAIAN 1: Padding Container Responsif
          - Sebelum: py-10
          - Sesudah: py-6 sm:py-10
      */}
      <PageContainer variant="default" className="py-6 sm:py-10">
        {/* PENYESUAIAN 2: Margin Bawah Responsif
            - Sebelum: mb-6
            - Sesudah: mb-4 sm:mb-6
        */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            {/* PENYESUAIAN 3: Ukuran Icon Responsif
                - Sebelum: width="30" height="30"
                - Sesudah: width="24" height="24" sm:width="30" sm:height="30"
            */}
            <Icon
              icon="hugeicons:idea-01"
              width="24"
              height="24"
              className="text-orange sm:w-[30px] sm:h-[30px]"
            />
            {/* PENYESUAIAN 4: Ukuran Font Judul Responsif
                - Sebelum: text-lg
                - Sesudah: text-base sm:text-lg
            */}
            <h2 className="text-base sm:text-lg font-semibold text-dark flex items-center gap-2">
              Hasil Pencarian untuk <span className="italic font-normal">"{keyword}"</span>
            </h2>
          </div>
          {/* PENYESUAIAN 5: Alignment & Ukuran Font Sub-Judul
                - Sebelum: text-dark/50 mt-2 pl-1
                - Sesudah: text-sm sm:text-base ... mt-1 sm:mt-2 pl-[32px] sm:pl-[38px]
                - Alasan: 'pl-[32px]' (24px icon + 8px gap) di mobile dan
                  'sm:pl-[38px]' (30px icon + 8px gap) di desktop
                  membuat teks ini lurus dengan judul di atasnya.
            */}
          <p className="text-sm sm:text-base text-dark/50 mt-1 sm:mt-2 pl-8 sm:pl-[38px]">
            Ditemukan <span className="font-medium">{hasilPencarian.length}</span> UMKM yang terkait
          </p>
        </div>

        {/* Grid UMKM */}
        {/* PENYESUAIAN 6: Spasi Grid Responsif
            - Sebelum: gap-6
            - Sesudah: gap-4 sm:gap-6
            - Alasan: Mengurangi spasi antar kartu di mobile.
            - justify-center md:justify-start (Sudah bagus!)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {hasilPencarian.map((umkm, index) => (
            <UMKMCard key={index} data={umkm} />
          ))}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default PencarianPage;