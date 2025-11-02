import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import KecamatanCard from "../components/KecamatanCard";
import UMKMCard from "../components/UMKMCard";
import ReviewCard from "../components/ReviewCard";
import { Link, useNavigate } from "react-router-dom";
import ArtikelCard from "../components/ArtikelCard";
import { dummyArticles, formatDate } from "./ArtikelPage";
import AOS from "aos";
import AnimatedIconBackground from "../components/AnimatedIconBackground";
import { dataUMKM } from "../data/dataUMKM";
import { dataKecamatan } from "../data/dataKecamatan";

import { useRef, useState, useEffect } from "react";

const HomePage = () => {
  /* --------------------------------------------------------------- */
  /*  Scroll to top + AOS refresh                                    */
  /* --------------------------------------------------------------- */
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      AOS?.refresh();
    }, 200);
  }, []);

  /* --------------------------------------------------------------- */
  /*  Static data (categories & steps)                               */
  /* --------------------------------------------------------------- */
  const categories = [
    { name: "Makanan", slug: "makanan", icon: "fluent:food-16-regular" },
    { name: "Minuman", slug: "minuman", icon: "fluent:drink-to-go-24-regular" },
    { name: "Jasa", slug: "jasa", icon: "ph:wrench" },
    { name: "Barang", slug: "barang", icon: "lucide:package-open" },
    { name: "Lainnya", slug: "lainnya", icon: "basil:other-1-outline" },
  ];

  const steps = [
    {
      num: "1",
      title: "Telusuri Kategori UMKM",
      desc: "Temukan berbagai usaha makanan, minuman, jasa, dan barang lokal.",
    },
    {
      num: "2",
      title: "Temukan Informasi Lengkap",
      desc: "Lihat profil, foto, lokasi, dan kontak setiap pelaku UMKM.",
    },
    {
      num: "3",
      title: "Pelajari & Kenali UMKM",
      desc: "Dapatkan wawasan tentang beragam usaha lokal di Kabupaten Kudus.",
    },
  ];

  /* --------------------------------------------------------------- */
  /*  Reviews – fetch from API                                       */
  /* --------------------------------------------------------------- */
  const [reviewData, setReviewData] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorReviews, setErrorReviews] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const response = await fetch(
          "https://api-umkmwongkudus.rplrus.com/api/rating"
        );
        const result = await response.json();

        if (result.status && Array.isArray(result.data)) {
          const formatted = result.data.map((item) => ({
            name: `${item.name} ${item.name_last}`.trim(),
            email: item.email,
            text: item.comment,
            rating: item.rating,
            date: new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            profileImage:
              item.photo_profil ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                item.name
              )}&background=eee&color=666`,
          }));
          setReviewData(formatted);
        } else {
          throw new Error(result.message || "Gagal memuat ulasan");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setErrorReviews("Gagal memuat ulasan. Silakan coba lagi nanti.");
        setReviewData([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  /* --------------------------------------------------------------- */
  /*  Scroll refs & states                                           */
  /* --------------------------------------------------------------- */
  const kecamatanScrollRef = useRef(null);
  const umkmScrollRef = useRef(null);
  const reviewScrollRef = useRef(null);

  const [canScrollLeftKecamatan, setCanScrollLeftKecamatan] = useState(false);
  const [canScrollRightKecamatan, setCanScrollRightKecamatan] = useState(true);
  const [isPausedUMKM, setIsPausedUMKM] = useState(false);
  const [canScrollLeftReview, setCanScrollLeftReview] = useState(false);
  const [canScrollRightReview, setCanScrollRightReview] = useState(true);

  const navigate = useNavigate();

  /* --------------------------------------------------------------- */
  /*  Kecamatan scroll helpers                                       */
  /* --------------------------------------------------------------- */
  const checkScrollKecamatan = () => {
    const el = kecamatanScrollRef.current;
    if (el) {
      setCanScrollLeftKecamatan(el.scrollLeft > 0);
      setCanScrollRightKecamatan(
        el.scrollLeft < el.scrollWidth - el.clientWidth - 1
      );
    }
  };

  const scrollKecamatan = (direction) => {
    const el = kecamatanScrollRef.current;
    if (el) {
      el.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = kecamatanScrollRef.current;
    if (!el) return;

    checkScrollKecamatan();
    const observer = new ResizeObserver(checkScrollKecamatan);
    observer.observe(el);
    window.addEventListener("resize", checkScrollKecamatan);

    return () => {
      observer.unobserve(el);
      window.removeEventListener("resize", checkScrollKecamatan);
    };
  }, []);

  /* --------------------------------------------------------------- */
  /*  UMKM auto‑scroll (infinite)                                    */
  /* --------------------------------------------------------------- */
  useEffect(() => {
    const el = umkmScrollRef.current;
    if (!el) return;

    let pos = el.scrollLeft;
    const interval = setInterval(() => {
      if (!isPausedUMKM && el) {
        const half = el.scrollWidth / 2;
        pos += 1;
        if (pos >= half) {
          pos = 0;
          el.scrollLeft = 0;
        } else {
          el.scrollLeft = pos;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPausedUMKM]);

  const handleUMKMScroll = (e) => {
    if (isPausedUMKM) {
      const el = e.currentTarget;
      const loop = el.scrollWidth / 2;
      if (el.scrollLeft >= loop) el.scrollLeft -= loop;
      else if (el.scrollLeft <= 0) el.scrollLeft += loop;
    }
  };

  /* --------------------------------------------------------------- */
  /*  Review scroll helpers                                          */
  /* --------------------------------------------------------------- */
  const scrollReview = (direction) => {
    const el = reviewScrollRef.current;
    if (!el) return;

    const card = el.querySelector("div > div");
    const width = (card?.offsetWidth || 300) + 16;

    el.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const checkScrollReview = () => {
    const el = reviewScrollRef.current;
    if (el) {
      setCanScrollLeftReview(el.scrollLeft > 0);
      setCanScrollRightReview(
        el.scrollLeft < el.scrollWidth - el.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    const el = reviewScrollRef.current;
    if (!el) return;

    checkScrollReview();
    const observer = new ResizeObserver(checkScrollReview);
    observer.observe(el);
    window.addEventListener("resize", checkScrollReview);

    return () => {
      observer.unobserve(el);
      window.removeEventListener("resize", checkScrollReview);
    };
  }, [reviewData]);

  /* --------------------------------------------------------------- */
  /*  Render                                                         */
  /* --------------------------------------------------------------- */
  return (
    <div className="bg-light min-h-screen">
      <Navbar />

      {/* ====================== HERO ====================== */}
      <section
        className="relative bg-cover bg-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-60 overflow-hidden"
        style={{ backgroundImage: "url('/images/hero_image_home.jpg')" }}
      >
        {/* Virtual Tour (iframe) – tetap ada, tapi di‑overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://tourism.kuduskab.go.id/virtualtour-live/"
            className="
              absolute
              -top-40 h-[190%]
              sm:top-[-200px] sm:h-[200%]
              md:-top-60 md:h-[210%]
              lg:top-[-220px] lg:h-[200%]
              xl:top-[-250px] xl:h-[210%]
              left-0 w-full object-cover
            "
            allowFullScreen
            frameBorder="0"
            title="Virtual Tour Kudus"
          ></iframe>
        </div>

        <div className="absolute inset-0 bg-dark/50"></div>

        <div className="relative z-10 container mx-auto px-4 py-24 sm:py-20 md:py-24 lg:py-32">
          {/* Title */}
          <motion.div
            className="max-w-3xl text-start"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl text-light leading-tight md:leading-normal">
              <span className="font-bold">Jelajahi</span>{" "}
              <span className="font-light">
                Berbagai <br /> UMKM di Kudus!
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-light/90 font-normal">
              Temukan beragam produk lokal, kuliner, dan layanan terbaik dari
              pelaku UMKM asli Kudus.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            className="mt-10 max-w-4xl flex flex-col md:flex-row gap-3 md:gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Cari nama tempat UMKM disini...."
              className="grow py-3 px-4 rounded-lg border-none focus:ring-2 focus:ring-orange focus:outline-none text-dark placeholder:text-dark/50 shadow-lg bg-light"
            />
            <button className="bg-orange text-light py-3 px-5 rounded-lg flex items-center justify-center md:justify-start font-semibold hover:bg-orange-500 transition-colors shadow-lg cursor-pointer">
              <Icon icon="tabler:search" className="w-4 h-4 mr-2" /> Search
            </button>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="mt-8 text-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <p className="text-light font-normal text-sm lg:text-base">
              Atau berdasarkan Kategori
            </p>
            <div className="mt-4 pt-1 flex flex-wrap justify-start gap-2 md:gap-4">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.slug}
                  className="rounded-xl flex flex-col items-center justify-center shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-pointer bg-light text-dark hover:bg-orange hover:text-light w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                  onClick={() => navigate(`/kategori?slug=${cat.slug}`)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                >
                  <Icon icon={cat.icon} className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-center line-clamp-1">
                    {cat.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================== CARA MENGGUNAKAN ====================== */}
      <section
        data-aos="fade-up"
        data-aos-delay="200"
        className="py-16 sm:py-20 px-4 md:px-12 lg:px-20 xl:px-30 relative"
      >
        <AnimatedIconBackground iconCount={15} color="text-orange" />
        <div className="container mx-auto px-4">
          <div className="bg-light rounded-2xl shadow-xl py-8 md:py-12 px-6 sm:px-10 md:px-16 relative z-10 -mt-24 sm:-mt-32 md:-mt-40">
            <h2 className="text-xl sm:text-2xl text-start text-dark mb-6 md:mb-10">
              <span className="font-bold">Bagaimana</span>{" "}
              <span className="font-normal">Cara Menggunakannya?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  data-aos="fade-up"
                  data-aos-delay={300 + i * 150}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 flex flex-col items-center">
                    <Icon
                      icon="gg:check-o"
                      className="w-8 h-8 sm:w-10 sm:h-10 text-green/75"
                    />
                    <span className="text-3xl sm:text-4xl font-bold text-dark/25 mt-1 leading-none">
                      {step.num}
                    </span>
                  </div>
                  <div className="mt-1 pt-1">
                    <h3 className="text-lg font-semibold text-dark">{step.title}</h3>
                    <p className="text-dark/50 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== KECAMATAN ====================== */}
      <section
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
        className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative"
      >
        <AnimatedIconBackground iconCount={15} color="text-orange" />
        <div className="mb-2 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl text-start text-dark">
            <span className="font-bold">Jelajahi</span>{" "}
            <span className="font-normal">UMKM Berdasarkan Kecamatan</span>
          </h2>
          <div className="flex md:hidden gap-2">
            <button
              onClick={() => scrollKecamatan("left")}
              disabled={!canScrollLeftKecamatan}
              className="text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Icon icon="tabler:chevron-left" className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollKecamatan("right")}
              disabled={!canScrollRightKecamatan}
              className="text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Icon icon="tabler:chevron-right" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CSS for scroll‑snap & hide scrollbar */}
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .snap-x { scroll-snap-type: x mandatory; }
          .snap-start { scroll-snap-align: start; }
        `}</style>

        <div className="relative">
          <div className="absolute top-0 left-0 w-4 sm:w-6 h-full bg-gradient-to-r from-light to-transparent z-10 pointer-events-none" />
          <div
            ref={kecamatanScrollRef}
            onScroll={checkScrollKecamatan}
            className="overflow-x-auto flex gap-4 py-3 no-scrollbar snap-x"
          >
            {dataKecamatan.map((kec, i) => (
              <div
                key={kec.slug}
                className="snap-start"
                data-aos="zoom-in"
                data-aos-delay={150 + i * 100}
                data-aos-duration="800"
                data-aos-easing="ease-in-out-sine"
                data-aos-anchor-placement="bottom-bottom"
              >
                <KecamatanCard data={kec} />
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 w-4 sm:w-6 h-full bg-gradient-to-l from-light to-transparent z-10 pointer-events-none" />
        </div>

        {/* Desktop arrows */}
        <button
          onClick={() => scrollKecamatan("left")}
          disabled={!canScrollLeftKecamatan}
          className="hidden md:block text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 left-0 xl:left-30 z-20 cursor-pointer"
        >
          <Icon icon="tabler:chevron-left" className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollKecamatan("right")}
          disabled={!canScrollRightKecamatan}
          className="hidden md:block text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 right-0 xl:right-30 z-20 cursor-pointer"
        >
          <Icon icon="tabler:chevron-right" className="w-5 h-5" />
        </button>
      </section>

      {/* ====================== POTRET UMKM ====================== */}
      <section data-aos="fade-up" className="px-4 md:px-8 lg:px-20 xl:px-50 mb-2 relative">
        <h2 className="text-xl sm:text-2xl text-start text-dark">
          <span className="font-bold">Potret</span>{" "}
          <span className="font-normal">UMKM Kudus</span>
        </h2>
        <p className="text-dark font-medium text-base mt-2">
          Melihat lebih dekat keberagaman usaha masyarakat Kudus yang tumbuh
          dari semangat lokal dan kreativitas.
        </p>
      </section>

      <section
        data-aos="fade-up"
        data-aos-delay="100"
        className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative"
      >
        <AnimatedIconBackground iconCount={15} color="text-orange" />
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="relative">
          <div className="absolute top-0 left-0 w-4 sm:w-16 h-full bg-gradient-to-r from-light to-transparent z-10 pointer-events-none" />
          <div
            className="relative w-full overflow-x-auto no-scrollbar"
            ref={umkmScrollRef}
            onMouseEnter={() => setIsPausedUMKM(true)}
            onMouseLeave={() => setIsPausedUMKM(false)}
            onScroll={handleUMKMScroll}
          >
            <motion.div style={{ width: "max-content" }} className="flex gap-4 py-3">
              {[...dataUMKM, ...dataUMKM].map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={(i % 10) * 50}
                  className="snap-start"
                >
                  <Link to={`/detail-umkm/${item.slug}`} className="block">
                    <UMKMCard data={item} />
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-4 sm:w-16 h-full bg-gradient-to-l from-light to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* ====================== REVIEW ====================== */}
      <section
        data-aos="fade-up"
        className="py-16 sm:py-20 mb-16 sm:mb-20 px-4 md:px-8 lg:px-20 xl:px-50 bg-dark/5 relative"
      >
        <div className="mb-6 flex justify-between items-end">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl text-start text-dark">
              <span className="font-bold">Apa Kata</span>{" "}
              <span className="font-normal">Mereka?</span>
            </h2>
            <p className="text-dark font-medium text-base mt-2">
              Ulasan dan testimoni nyata dari para pengguna website kami.
            </p>
          </div>
          <div className="flex md:hidden gap-2 ml-2">
            <button
              onClick={() => scrollReview("left")}
              disabled={!canScrollLeftReview}
              className="text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Icon icon="tabler:chevron-left" className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollReview("right")}
              disabled={!canScrollRightReview}
              className="text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Icon icon="tabler:chevron-right" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          {loadingReviews ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange"></div>
            </div>
          ) : errorReviews ? (
            <p className="text-center text-red-500 py-10">{errorReviews}</p>
          ) : reviewData.length === 0 ? (
            <p className="text-center text-dark/60 py-10">Belum ada ulasan.</p>
          ) : (
            <motion.div
              ref={reviewScrollRef}
              onScroll={checkScrollReview}
              className="overflow-x-auto flex gap-4 py-10 no-scrollbar snap-x snap-mandatory items-stretch"
            >
              {reviewData.map((rev, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 150}
                  data-aos-duration="600"
                  data-aos-easing="ease-out-cubic"
                  className="snap-start shrink-0"
                >
                  <ReviewCard review={rev} />
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Desktop arrows */}
        <button
          onClick={() => scrollReview("left")}
          disabled={!canScrollLeftReview}
          className="hidden md:block text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 left-0 xl:left-30 z-20 cursor-pointer"
        >
          <Icon icon="tabler:chevron-left" className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollReview("right")}
          disabled={!canScrollRightReview}
          className="hidden md:block text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 right-0 xl:right-30 z-20 cursor-pointer"
        >
          <Icon icon="tabler:chevron-right" className="w-5 h-5" />
        </button>

        <div className="flex justify-center sm:justify-end mt-4">
          <button
            onClick={() => navigate("/kontak#review")}
            className="bg-orange text-light py-3 px-5 rounded-lg flex items-center justify-center w-full sm:w-auto font-semibold hover:bg-orange-500 transition-colors shadow-lg cursor-pointer"
          >
            Beri Kami Ulasan <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* ====================== ARTIKEL ====================== */}
      <section
        data-aos="fade-up"
        className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative"
      >
        <AnimatedIconBackground iconCount={15} color="text-orange" />
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl text-start text-dark">
              <span className="font-bold">Beberapa Artikel</span>{" "}
              <span className="font-normal">Terkait UMKM</span>
            </h2>
          </div>
          <Link
            to="/artikel"
            className="flex items-center text-dark/70 hover:text-orange font-semibold transition-colors group shrink-0"
          >
            Semua Artikel{" "}
            <Icon
              icon="tabler:chevron-right"
              className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dummyArticles.slice(0, 3).map((art) => (
            <div key={art.id} data-aos="fade-up" data-aos-delay="100">
              <ArtikelCard
                image={art.image}
                category={art.category}
                title={art.title}
                displayDate={formatDate(art.date)}
                author={art.author}
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;