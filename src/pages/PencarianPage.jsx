import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import UMKMCard from "../components/UMKMCard";
import { Icon } from "@iconify/react";
import PageContainer from "../components/PageContainer";

const PencarianPage = () => {
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
    <div className="bg-light min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <HeroContent
        image="/images/pencarian_hero_content.png"
        title="Temukan berbagai usaha lokal sesuai kata kunci pilihanmu."
        subtitle="Dukung pelaku UMKM lokal dan temukan produk, layanan, serta kuliner pilihan di Kudus."
      />

      <PageContainer variant="default" className="py-6 sm:py-10">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Icon
              icon="hugeicons:idea-01"
              width="24"
              height="24"
              className="text-orange sm:w-[30px] sm:h-[30px]"
            />
            <h2 className="text-base sm:text-lg font-semibold text-dark flex items-center gap-2">
              Hasil Pencarian untuk{" "}
              <span className="italic font-normal">"{keyword}"</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-dark/50 mt-1 sm:mt-2 pl-8 sm:pl-[38px]">
            Ditemukan{" "}
            <span className="font-medium">{hasilPencarian.length}</span> UMKM
            yang terkait
          </p>
        </div>
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
