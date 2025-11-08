import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import KecamatanCard from "../components/KecamatanCard";
import UMKMCard from "../components/UMKMCard";
import ReviewCard from "../components/ReviewCard";
import { Link, useNavigate } from "react-router-dom";
import ArtikelCard from "../components/ArtikelCard";
import AOS from "aos";
import AnimatedIconBackground from "../components/AnimatedIconBackground";
import { dataUMKM } from "../data/dataUMKM";
import { dataKecamatan } from "../data/dataKecamatan";
import { useRef, useState, useEffect } from "react";

const UMKMScrollSection = () => {
  const umkmScrollRef = useRef(null);
  const posRef = useRef(0);
  const [isPausedUMKM, setIsPausedUMKM] = useState(false);

  useEffect(() => {
    const el = umkmScrollRef.current;
    if (!el) return;

    let frameId;

    const animateScroll = () => {
      if (!isPausedUMKM && el) {
        const half = el.scrollWidth / 2;
        posRef.current += 1;
        if (posRef.current >= half) {
          posRef.current = 0;
        }
        el.scrollLeft = posRef.current;
      }
      frameId = requestAnimationFrame(animateScroll);
    };

    frameId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(frameId);
  }, [isPausedUMKM]);

  const handleUMKMScroll = (e) => {
    const el = e.currentTarget;
    if (isPausedUMKM) {
      const loop = el.scrollWidth / 2;

      if (el.scrollLeft >= loop - 1) {
        el.scrollLeft -= loop;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += loop;
      }
      posRef.current = el.scrollLeft;
    }
  };

  return (
    <section
      data-aos="fade-up"
      data-aos-delay="100"
      className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative"
    >
      <AnimatedIconBackground iconCount={15} color="text-orange" />
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="relative">
        <div className="absolute top-0 left-0 w-4 sm:w-16 h-full bg-linear-to-r from-light to-transparent z-10 pointer-events-none" />
        <div
          className="relative w-full overflow-x-auto no-scrollbar"
          ref={umkmScrollRef}
          onMouseEnter={() => setIsPausedUMKM(true)}
          onMouseLeave={() => setIsPausedUMKM(false)}
          onTouchStart={() => setIsPausedUMKM(true)}
          onTouchEnd={() => setIsPausedUMKM(false)}
          onScroll={handleUMKMScroll}
        >
          <motion.div
            style={{ width: "max-content" }}
            className="flex gap-4 py-3"
          >
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
        <div className="absolute top-0 right-0 w-4 sm:w-16 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

const HomePage = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const placeholders = [
    "Cari produk unggulan UMKM Kudus...",
    "Temukan inspirasi dari pelaku usaha lokal...",
    "Jelajahi potensi ekonomi kreatif daerah...",
    "Dukung bisnis kecil di sekitarmu...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // State untuk Artikel (dari kode teman)
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [errorArticles, setErrorArticles] = useState("");
  const [blogCategories, setBlogCategories] = useState({});

  // State untuk Review
  const [reviewData, setReviewData] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorReviews, setErrorReviews] = useState("");

  // Helper Format Tanggal (dari kode teman)
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      AOS?.refresh();
    }, 200);
  }, []);

  // Ganti placeholder tiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter data UMKM untuk suggestion
  useEffect(() => {
    if (debouncedTerm.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = dataUMKM.filter((umkm) =>
      umkm.name.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [debouncedTerm]);

  // === Fetch Kategori Blog (dari kode teman) ===
  useEffect(() => {
    const fetchBlogCategories = async () => {
      try {
        const response = await fetch(
          "https://api-umkmwongkudus.rplrus.com/api/categories-blog"
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();

        if (result.status && Array.isArray(result.data)) {
          const map = {};
          result.data.forEach((cat) => {
            map[cat.id] = cat.title;
          });
          setBlogCategories(map);
        } else {
          console.warn("Gagal memuat kategori, gunakan fallback");
          setBlogCategories({ 1: "UMKM", 2: "Lainnya" });
        }
      } catch (err) {
        console.error("Error fetching blog categories:", err);
        setBlogCategories({ 1: "UMKM", 2: "Lainnya" });
      }
    };

    fetchBlogCategories();
  }, []);

  // === Fetch Artikel (dari kode teman) ===
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoadingArticles(true);
        const response = await fetch(
          "https://api-umkmwongkudus.rplrus.com/api/articles"
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();

        if (result.status && Array.isArray(result.data)) {
          const formatted = result.data.slice(0, 3).map((item) => ({
            id: item.id,
            title: item.title,
            author: item.author,
            image: item.image,
            category: blogCategories[item.category_blog_id] || "Lainnya",
            date: item.created_at,
          }));
          setArticles(formatted);
        } else {
          throw new Error(result.message || "Gagal memuat artikel");
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setErrorArticles("Gagal memuat artikel. Silakan coba lagi nanti.");
        setArticles([]);
      } finally {
        setLoadingArticles(false);
      }
    };

    if (Object.keys(blogCategories).length > 0) {
      fetchArticles();
    }
  }, [blogCategories]);

  // === Fetch Reviews ===
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

  const kecamatanScrollRef = useRef(null);
  const [canScrollLeftKecamatan, setCanScrollLeftKecamatan] = useState(false);
  const [canScrollRightKecamatan, setCanScrollRightKecamatan] = useState(true);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (slug) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/detail-umkm/${slug}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSuggestions([]);
      navigate(`/pencarian?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="bg-light min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-60 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://tourism.kuduskab.go.id/virtualtour-live/"
            className={`
              absolute
              -top-40 h-[190%]
              sm:top-[-200px] sm:h-[200%]
              md:-top-60 md:h-[210%]
              lg:top-[-220px] lg:h-[200%]
              xl:top-[-250px] xl:h-[210%]
              left-0 w-full object-cover
              transition-opacity duration-1000
              ${iframeLoaded ? "opacity-100" : "opacity-0"}
            `}
            onLoad={() => setIframeLoaded(true)}
            allowFullScreen
            frameBorder="0"
            title="Virtual Tour Kudus"
          ></iframe>
        </div>

        <div className="absolute inset-0 bg-dark/50"></div>

        <div className="relative z-10 container mx-auto px-4 py-24 sm:py-20 md:py-24 lg:py-32">
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

          <motion.div
            className="mt-10 max-w-4xl flex flex-col md:flex-row gap-3 md:gap-4 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="grow relative"
              id="searchForm"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full py-3 px-4 rounded-lg border-none focus:ring-2 focus:ring-orange focus:outline-none text-dark placeholder:text-dark/50 shadow-lg bg-light"
                  placeholder=""
                />
                {searchTerm === "" && (
                  <div className="pointer-events-none absolute inset-0 flex items-center px-4">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-dark/50 select-none"
                      >
                        {placeholders[placeholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {suggestions.length > 0 && (
                <div className="absolute z-20 w-full bg-light rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {suggestions.map((sug, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 hover:bg-orange/10 cursor-pointer"
                      onClick={() => handleSuggestionClick(sug.slug)}
                    >
                      {sug.name}
                    </div>
                  ))}
                </div>
              )}
            </form>

            <button
              type="submit"
              className="bg-orange text-light py-3 px-5 rounded-lg flex items-center justify-center md:justify-start font-semibold hover:bg-orange-500 transition-colors shadow-lg cursor-pointer"
              onClick={handleSearchSubmit}
              form="searchForm"
            >
              <Icon icon="tabler:search" className="w-4 h-4 mr-2" /> Search
            </button>
          </motion.div>

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
                  <Icon
                    icon={cat.icon}
                    className="w-5 h-5 sm:w-6 sm:h-6 mb-1"
                  />
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-center line-clamp-1">
                    {cat.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cara Menggunakan */}
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
                    <h3 className="text-lg font-semibold text-dark">
                      {step.title}
                    </h3>
                    <p className="text-dark/50 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kecamatan */}
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

        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .snap-x {
            scroll-snap-type: x mandatory;
          }
          .snap-start {
            scroll-snap-align: start;
          }
        `}</style>

        <div className="relative">
          <div className="absolute top-0 left-0 w-4 sm:w-6 h-full bg-linear-to-r from-light to-transparent z-10 pointer-events-none" />
          <div
            ref={kecamatanScrollRef}
            onScroll={checkScrollKecamatan}
            className="overflow-x-auto flex gap-4 py-3 no-scrollbar snap-x"
          >
            {dataKecamatan.map((kec, i) => {
              const placeCount = dataUMKM.filter(
                (umkm) => umkm.kecamatanSlug === kec.slug
              ).length;
              const kecWithCount = { ...kec, placeCount };
              return (
                <div
                  key={kec.slug}
                  className="snap-start"
                  data-aos="zoom-in"
                  data-aos-delay={150 + i * 100}
                  data-aos-duration="800"
                  data-aos-easing="ease-in-out-sine"
                  data-aos-anchor-placement="bottom-bottom"
                >
                  <KecamatanCard data={kecWithCount} />
                </div>
              );
            })}
          </div>
          <div className="absolute top-0 right-0 w-4 sm:w-6 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />
        </div>

        <button
          onClick={() => scrollKecamatan("left")}
          disabled={!canScrollLeftKecamatan}
          className="hidden md:block text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-[42%] -translate-y-1/2 left-0 xl:left-30 z-20 cursor-pointer"
        >
          <Icon icon="tabler:chevron-left" className="w-5 h-5" />
        </button>

        <button
          onClick={() => scrollKecamatan("right")}
          disabled={!canScrollRightKecamatan}
          className="hidden md:block text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-[42%] -translate-y-1/2 right-0 xl:right-30 z-20 cursor-pointer"
        >
          <Icon icon="tabler:chevron-right" className="w-5 h-5" />
        </button>
      </section>

      {/* Potret UMKM */}
      <section
        data-aos="fade-up"
        className="px-4 md:px-8 lg:px-20 xl:px-50 mb-2 relative"
      >
        <h2 className="text-xl sm:text-2xl text-start text-dark">
          <span className="font-bold">Potret</span>{" "}
          <span className="font-normal">UMKM Kudus</span>
        </h2>
        <p className="text-dark font-medium text-base mt-2">
          Melihat lebih dekat keberagaman usaha masyarakat Kudus yang tumbuh
          dari semangat lokal dan kreativitas.
        </p>
      </section>

      <UMKMScrollSection />

      {/* Review */}
      <section
        data-aos="fade-up"
        className="relative py-14 sm:py-20 mb-14 sm:mb-20 px-4 md:px-8 lg:px-20 xl:px-50 bg-transparent overflow-hidden"
      >
        <AnimatedIconBackground iconCount={15} color="text-orange" />

        <div className="mb-2 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-semibold text-dark">
              <span className="font-bold">Apa Kata</span>{" "}
              <span className="font-normal">Mereka?</span>
            </h2>
            <p className="text-dark/80 font-medium text-sm sm:text-base mt-2 max-w-xl">
              Ulasan dan testimoni nyata dari para pengguna website kami.
            </p>
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
            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-2 sm:py-4 justify-center items-stretch">
              {reviewData.slice(0, 3).map((rev, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 150}
                  data-aos-duration="600"
                  data-aos-easing="ease-out-cubic"
                  className="shrink-0"
                >
                  <ReviewCard review={rev} />
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="flex justify-center sm:justify-end mt-8 sm:mt-10">
          <button
            onClick={() => navigate("/kontak#review")}
            className="bg-orange text-light py-3 px-6 sm:px-8 rounded-lg flex items-center justify-center font-semibold hover:bg-orange-500 transition-colors shadow-md w-full sm:w-auto"
          >
            Beri Kami Ulasan{" "}
            <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Artikel */}
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
          {loadingArticles ? (
            <div className="col-span-full flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange"></div>
            </div>
          ) : errorArticles ? (
            <div className="col-span-full text-center text-red-500 py-10">
              {errorArticles}
            </div>
          ) : articles.length === 0 ? (
            <div className="col-span-full text-center text-dark/60 py-10">
              Belum ada artikel.
            </div>
          ) : (
            articles.map((art, i) => (
              <div
                key={art.id}
                data-aos="fade-up"
                data-aos-delay={100 + i * 100}
              >
                <ArtikelCard
                  image={art.image}
                  category={art.category}
                  title={art.title}
                  displayDate={formatDate(art.date)}
                  author={art.author}
                />
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
