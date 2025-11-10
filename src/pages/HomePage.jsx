import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import KecamatanCard from "../components/KecamatanCard";
import UMKMCard from "../components/UMKMCard";
import ReviewCard from "../components/ReviewCard";
import { Link, useNavigate } from "react-router-dom";
import ArtikelCard from "../components/ArtikelCard";
import AOS from "aos";
import AnimatedIconBackground from "../components/AnimatedIconBackground";
import { dataKecamatan } from "../data/dataKecamatan";
import SearchBar from "../components/SearchBar";
import { useRef, useState, useEffect } from "react";
import { dataUMKM } from "../data/dataUMKM";

const UMKMScrollSection = () => {
  const umkmScrollRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const userInteractingRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const SPEED = 2.0;

  useEffect(() => {
    const el = umkmScrollRef.current;
    if (!el) return;

    const half = () => el.scrollWidth / 2;

    const animate = (time) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!userInteractingRef.current) {
        posRef.current += SPEED * (delta / 16);
        const loop = half();
        if (posRef.current >= loop) posRef.current -= loop;
        el.scrollLeft = posRef.current;
      } else {
        posRef.current = el.scrollLeft % half();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const startInteraction = () => {
    userInteractingRef.current = true;
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const endInteraction = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      userInteractingRef.current = false;
      const el = umkmScrollRef.current;
      if (!el) return;
      const loop = el.scrollWidth / 2;
      posRef.current = el.scrollLeft % loop;
    }, 300);
  };

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const loop = el.scrollWidth / 2;
    if (userInteractingRef.current) {
      if (el.scrollLeft >= loop) el.scrollLeft -= loop;
      if (el.scrollLeft <= 0) el.scrollLeft = (el.scrollLeft + loop) % loop;
      posRef.current = el.scrollLeft;
    } else {
      posRef.current = el.scrollLeft % loop;
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
          onPointerDown={startInteraction}
          onPointerUp={endInteraction}
          onPointerCancel={endInteraction}
          onMouseEnter={startInteraction}
          onMouseLeave={endInteraction}
          onTouchStart={startInteraction}
          onTouchEnd={endInteraction}
          onScroll={handleScroll}
        >
          <motion.div
            style={{ width: "max-content" }}
            className="flex gap-4 py-3"
          >
            {[...dataUMKM, ...dataUMKM].map((item, i) => (
              <div key={i} className="snap-start">
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
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [errorArticles, setErrorArticles] = useState("");
  const [blogCategories, setBlogCategories] = useState({});

  const [reviewData, setReviewData] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorReviews, setErrorReviews] = useState("");

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
          setBlogCategories({ 1: "UMKM", 2: "Lainnya" });
        }
      } catch (err) {
        console.error("Error fetching blog categories:", err);
        setBlogCategories({ 1: "UMKM", 2: "Lainnya" });
      }
    };

    fetchBlogCategories();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      if (Object.keys(blogCategories).length === 0) return;
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

    fetchArticles();
  }, [blogCategories]);

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

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.children[0];
    const cardWidth = firstCard?.offsetWidth || 300;
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.children[0];
    const cardWidth = firstCard?.offsetWidth || 300;
    scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  useEffect(() => {
    const kecEl = kecamatanScrollRef.current;
    if (kecEl) {
      checkScrollKecamatan();
      const observer = new ResizeObserver(checkScrollKecamatan);
      observer.observe(kecEl);
      window.addEventListener("resize", checkScrollKecamatan);
      return () => {
        observer.unobserve(kecEl);
        window.removeEventListener("resize", checkScrollKecamatan);
      };
    }
  }, []);

  useEffect(() => {
    const revEl = scrollRef.current;
    if (revEl) {
      checkScroll();
      const observer = new ResizeObserver(checkScroll);
      observer.observe(revEl);
      window.addEventListener("resize", checkScroll);
      return () => {
        observer.unobserve(revEl);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  return (
    <div className="bg-light min-h-screen">
      <Navbar />

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
            className="mt-10 max-w-4xl w-full min-w-0 flex flex-col md:flex-row gap-3 md:gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <SearchBar />
            <button
              type="submit"
              form="searchForm"
              className="bg-orange text-light py-3 px-5 rounded-lg flex items-center justify-center md:justify-start font-semibold hover:bg-orange-500 transition-colors shadow-lg cursor-pointer w-full md:w-auto"
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

            <div className="mt-4 pt-1 flex flex-wrap justify-start gap-3 sm:gap-4 md:gap-4">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.slug}
                  className="rounded-xl flex flex-col items-center justify-center shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-pointer bg-light text-dark hover:bg-orange hover:text-light
        w-16 h-16 sm:w-18 sm:h-18 md:w-18 md:h-18 lg:w-20 lg:h-20 p-2"
                  onClick={() => navigate(`/kategori?slug=${cat.slug}`)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                >
                  <Icon
                    icon={cat.icon}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 mb-1"
                  />
                  <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-center line-clamp-1 leading-tight">
                    {cat.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

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

      <section
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="900"
        data-aos-easing="ease-out-cubic"
        className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative"
      >
        <AnimatedIconBackground iconCount={15} color="text-orange" />

        <div className="mb-2 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-2xl text-start text-dark flex items-center gap-3 justify-between">
              <div>
                <span className="font-bold">Jelajahi</span>{" "}
                <span className="font-normal">UMKM Berdasarkan Kecamatan</span>
              </div>

              <div className="flex sm:hidden gap-2">
                <button
                  onClick={() => scrollKecamatan("left")}
                  disabled={!canScrollLeftKecamatan}
                  className="p-2 bg-light rounded-lg shadow hover:bg-orange hover:text-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Icon icon="mdi:chevron-left" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollKecamatan("right")}
                  disabled={!canScrollRightKecamatan}
                  className="p-2 bg-light rounded-lg shadow hover:bg-orange hover:text-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Icon icon="mdi:chevron-right" className="w-5 h-5" />
                </button>
              </div>
            </h2>
          </div>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scrollKecamatan("left")}
              disabled={!canScrollLeftKecamatan}
              className="p-3 bg-light rounded-lg shadow hover:bg-orange hover:text-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-left" className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollKecamatan("right")}
              disabled={!canScrollRightKecamatan}
              className="p-3 bg-light rounded-lg shadow hover:bg-orange hover:text-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-right" className="w-6 h-6" />
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
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-3 snap-x"
          >
            {dataKecamatan.map((kec, i) => {
              const placeCount = dataUMKM.filter(
                (umkm) => umkm.kecamatanSlug === kec.slug
              ).length;
              const kecWithCount = { ...kec, placeCount };
              return (
                <div
                  key={kec.slug}
                  data-aos="zoom-in"
                  data-aos-delay={150 + i * 100}
                  data-aos-duration="800"
                  data-aos-easing="ease-in-out-sine"
                  data-aos-anchor-placement="bottom-bottom"
                  className="snap-start"
                >
                  <KecamatanCard data={kecWithCount} />
                </div>
              );
            })}
          </div>
          <div className="absolute top-0 right-0 w-4 sm:w-6 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      <section
        data-aos="fade-up"
        className="px-4 md:px-8 lg:px-20 xl:px-50 mb-2 relative"
      >
        <h2 className="text-xl sm:text-2xl text-start text-dark">
          <span className="font-bold">Potret</span>{" "}
          <span className="font-normal">UMKM Kudus</span>
        </h2>
        <p className="text-dark/80 font-medium text-sm sm:text-base mt-2">
          Melihat lebih dekat keberagaman usaha masyarakat Kudus yang tumbuh
          dari semangat lokal dan kreativitas.
        </p>
      </section>

      <UMKMScrollSection />

      <section
        data-aos="fade-up"
        className="relative py-4 mb-14 sm:mb-20 px-4 md:px-8 lg:px-20 xl:px-50 bg-transparent overflow-hidden"
      >
        <AnimatedIconBackground iconCount={15} color="text-orange" />

        <div className="mb-2 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-dark flex items-center gap-3 justify-between">
              <div>
                <span className="font-bold">Apa</span>{" "}
                <span className="font-normal">Kata Mereka?</span>
              </div>

              <div className="flex sm:hidden gap-2">
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className="p-2 bg-light rounded-lg shadow hover:bg-orange hover:text-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Icon icon="mdi:chevron-left" className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className="p-2 bg-light rounded-lg shadow hover:bg-orange hover:text-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Icon icon="mdi:chevron-right" className="w-5 h-5" />
                </button>
              </div>
            </h2>

            <p className="text-dark/80 font-medium text-sm sm:text-base mt-2 max-w-xl">
              Ulasan dan testimoni nyata dari para pengguna website kami.
            </p>
          </div>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="p-3 bg-light rounded-lg shadow hover:bg-orange hover:text-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-left" className="w-6 h-6" />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="p-3 bg-light rounded-lg shadow hover:bg-orange hover:text-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-right" className="w-6 h-6" />
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
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2 sm:py-4 snap-x"
            >
              {reviewData.map((rev, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 150}
                  data-aos-duration="600"
                  data-aos-easing="ease-out-cubic"
                  className="min-w-[85%] sm:min-w-[32%] snap-start"
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
                  id={art.id}
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
