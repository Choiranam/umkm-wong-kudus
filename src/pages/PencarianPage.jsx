import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import UMKMCard from "../components/UMKMCard";
import { Icon } from "@iconify/react";
import PageContainer from "../components/PageContainer";
import { useSearchParams, Link } from "react-router-dom";
import api from "../services/api";

const PencarianPage = () => {
  const [searchParams] = useSearchParams();
  const [hasilPencarian, setHasilPencarian] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const query = (searchParams.get("query") || "").trim();
    setKeyword(query);

    if (!query) {
      setHasilPencarian([]);
      return;
    }

    setLoading(true);

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    api
      .get("/umkm", { params: { search: query }, signal: controller.signal })
      .then((res) => {
        const data = Array.isArray(res?.data?.data) ? res.data.data : [];

        const q = query.toLowerCase();

        const filtered = data.filter((item) => {
          const name = (item?.name || "").toString().toLowerCase();
          return name.includes(q);
        });

        setHasilPencarian(filtered);
      })
      .catch((err) => {
        if (err?.name === "CanceledError" || err?.name === "AbortError") return;
        setHasilPencarian([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
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
            {loading ? (
              "Mencari..."
            ) : (
              <>
                Ditemukan{" "}
                <span className="font-medium">{hasilPencarian.length}</span>{" "}
                UMKM yang terkait
              </>
            )}
          </p>
        </div>

        {loading ? (
          <p className="text-center text-dark text-base">Mencari data...</p>
        ) : hasilPencarian.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {hasilPencarian.map((umkm, index) => (
              <Link
                key={umkm.id ?? index}
                to={`/detail-umkm/${umkm.slug}`}
                className="block w-full"
              >
                <UMKMCard data={umkm} />
              </Link>
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
