import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import UMKMCard from "../components/UMKMCard";
import { Icon } from "@iconify/react";
import PageContainer from "../components/PageContainer"; // ✅ import PageContainer

const PencarianPage = () => {
  // Data hasil pencarian (contoh bisa diganti dari API nanti)
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

  const keyword = "Ra";

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
      <PageContainer variant="default" className="py-10">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Icon icon="hugeicons:idea-01" width="30" height="30" className="text-orange" />
            <h2 className="text-lg font-semibold text-dark flex items-center gap-2">
              Hasil Pencarian untuk <span className="italic font-normal">"{keyword}"</span>
            </h2>
          </div>
          <p className="text-dark/50 mt-2 pl-1">
            Ditemukan <span className="font-medium">{hasilPencarian.length}</span> UMKM yang terkait
          </p>
        </div>

        {/* Grid UMKM */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
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