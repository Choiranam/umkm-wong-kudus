import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import UMKMCard from "../components/UMKMCard";
import { Icon } from "@iconify/react";
import PageContainer from "../components/PageContainer";
import { dataUMKM } from "../data/dataUMKM";
import { useSearchParams } from "react-router-dom";

const PencarianPage = () => {
  const [searchParams] = useSearchParams();
  const [hasilPencarian, setHasilPencarian] = useState([]);
  const [keyword, setKeyword] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setKeyword(query);
    if (query.trim()) {
      const filtered = dataUMKM.filter((umkm) =>
        umkm.name.toLowerCase().includes(query.toLowerCase())
      );
      setHasilPencarian(filtered);
    } else {
      setHasilPencarian([]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="bg-light min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <HeroContent
        image="/images/pencarian_hero_content.webp"
        title="Temukan berbagai usaha lokal sesuai kata kunci pilihanmu."
        subtitle="Dukung pelaku UMKM lokal dan temukan produk, layanan, serta kuliner pilihan di Kudus."
      />

      <PageContainer variant="default" className="py-6 sm:py-10">
        <div ref={contentRef} className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Icon
              icon="hugeicons:idea-01"
              width="24"
              height="24"
              className="text-orange sm:w-[30px] sm:h-[30px]"
            />
            <h2 className="text-base sm:text-lg font-semibold text-dark flex flex-wrap gap-2">
              Hasil Pencarian untuk{" "}
              <span className="italic font-normal max-w-full wrap-break-word">
                "{keyword}"
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-dark/50 mt-1 sm:mt-2 pl-8 sm:pl-[38px]">
            Ditemukan{" "}
            <span className="font-medium">{hasilPencarian.length}</span> UMKM
            yang terkait
          </p>
        </div>
        {hasilPencarian.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {hasilPencarian.map((umkm, index) => (
              <UMKMCard key={index} data={umkm} />
            ))}
          </div>
        ) : (
          <p className="text-center text-dark text-base">
            Tidak ditemukan UMKM dengan kata kunci "{keyword}". Coba kata kunci
            lain.
          </p>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
};

export default PencarianPage;
