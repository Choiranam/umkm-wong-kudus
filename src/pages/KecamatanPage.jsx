import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import UMKMCard from "../components/UMKMCard";
import { Icon } from "@iconify/react";

const KecamatanPage = () => {
  // Daftar kategori dengan iconify
  const kategoriList = [
    { id: 1, name: "Makanan", icon: "fluent:food-16-regular", color: "bg-orange text-white" },
    { id: 2, name: "Minuman", icon: "fluent:drink-to-go-24-regular" },
    { id: 3, name: "Jasa", icon: "ph:wrench" },
    { id: 4, name: "Barang", icon: "lucide:package-open" },
    { id: 5, name: "Lainnya", icon: "basil:other-1-outline" },
  ];

  const [activeCategory, setActiveCategory] = useState("Makanan");

  // Data dummy UMKM (nanti bisa diganti dari API)
  const umkmData = Array(9).fill({
    name: "Ramboo Chicken",
    category: "Makanan",
    description:
      "Ramboo Chicken Kudus merupakan usaha kuliner yang menyajikan beragam olahan ayam khas.",
    location: "Kota Kudus",
    openHour: "10.00–21.00",
    image: "/images/sampel_umkm.png",
  });

  return (
    <div className="bg-light min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <HeroContent
        image="/images/sampel_hero_content.jpeg"
        title="Daftar UMKM di Daerah Kecamatan Kaliwungu Kudus"
        subtitle="Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Kaliwungu Kudus."
      />

      {/* Kategori Tabs + List UMKM */}
      <PageContainer variant="wide" className="py-10">
        {/* Tabs Kategori */}
        <div className="flex flex-wrap justify-start gap-3 mb-10">
          {kategoriList.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg ${activeCategory === item.name
                ? "bg-orange text-light shadow-lg"
                : "bg-light text-dark hover:bg-orange/10 hover:shadow-lg"
                }`}
            >
              <Icon
                icon={item.icon}
                width="18"
                height="18"
                className={`${activeCategory === item.name ? "text-white" : "text-dark"}`}
              />
              {item.name}
            </button>
          ))}
        </div>

        {/* Grid UMKM */}
        <div
          className="
    grid gap-6
    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    justify-items-center
  "
        >
          {umkmData.map((umkm, index) => (
            <UMKMCard key={index} data={umkm} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-2">
            {/* Tombol kiri */}
            <button className="text-dark/50 hover:text-orange transition">
              <Icon icon="fluent:chevron-left-12-filled" width="22" height="22" />
            </button>

            {/* Nomor halaman aktif */}
            <span className="px-4 py-1 rounded-md bg-orange text-white font-medium">
              1
            </span>

            {/* Tombol kanan */}
            <button className="text-dark/50 hover:text-orange transition">
              <Icon icon="fluent:chevron-right-12-filled" width="22" height="22" />
            </button>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default KecamatanPage;
