import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import KecamatanCard from "../components/KecamatanCard";
import { useRef, useState, useEffect } from "react";
import UMKMCard from "../components/UMKMCard";
import ReviewCard from "../components/ReviewCard";
import { Link, useNavigate } from "react-router-dom";
import ArtikelCard from "../components/ArtikelCard";
import { dummyArticles, formatDate } from "./ArtikelPage";

const HomePage = () => {
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

    const kecamatanData = [
        {
            name: "Bae",
            slug: "bae",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Bae",
            placeCount: 27,
        },
        {
            name: "Kaliwungu",
            slug: "kaliwungu",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Kaliwungu",
            placeCount: 19,
        },
        {
            name: "Kota (Kudus)",
            slug: "kota-kudus",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Kota+Kudus",
            placeCount: 42,
        },
        {
            name: "Gebog",
            slug: "gebog",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Gebog",
            placeCount: 5,
        },
        {
            name: "Dawe",
            slug: "dawe",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Dawe",
            placeCount: 15,
        },
        {
            name: "Jati",
            slug: "jati",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Jati",
            placeCount: 22,
        },
        {
            name: "Jekulo",
            slug: "jekulo",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Jekulo",
            placeCount: 11,
        },
        {
            name: "Mejobo",
            slug: "mejobo",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Mejobo",
            placeCount: 17,
        },
        {
            name: "Undaan",
            slug: "undaan",
            image: "https://placehold.co/180x256/E2E8F0/334155?text=Undaan",
            placeCount: 7,
        },
    ];

    // Refs
    const kecamatanScrollRef = useRef(null);
    const umkmScrollRef = useRef(null);
    const reviewScrollRef = useRef(null);

    // State
    const [canScrollLeftKecamatan, setCanScrollLeftKecamatan] = useState(false);
    const [canScrollRightKecamatan, setCanScrollRightKecamatan] = useState(true);
    const [isPausedUMKM, setIsPausedUMKM] = useState(false);
    const [canScrollLeftReview, setCanScrollLeftReview] = useState(false);
    const [canScrollRightReview, setCanScrollRightReview] = useState(true);

    const navigate = useNavigate();

    // Cek scroll Kecamatan
    const checkScrollKecamatan = () => {
        const el = kecamatanScrollRef.current;
        if (el) {
            setCanScrollLeftKecamatan(el.scrollLeft > 0);
            setCanScrollRightKecamatan(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
        }
    };

    // Fungsi scroll Kecamatan
    const scrollKecamatan = (direction) => {
        const el = kecamatanScrollRef.current;
        if (el) {
            const scrollAmount = 200;
            el.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Effect scroll Kecamatan
    useEffect(() => {
        const el = kecamatanScrollRef.current;
        if (el) {
            checkScrollKecamatan();
            const resizeObserver = new ResizeObserver(checkScrollKecamatan);
            resizeObserver.observe(el);
            window.addEventListener("resize", checkScrollKecamatan);

            return () => {
                resizeObserver.unobserve(el);
                window.removeEventListener("resize", checkScrollKecamatan);
            };
        }
    }, []);

    // Data dummy UMKM
    const dummyData = [
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
        {
            name: "Ramboo Chicken",
            category: "Makanan",
            description:
                "Ramboo Chicken Kudus merupakan usaha kuliner yang menyiapkan beragam olahan...",
            location: "Kota Kudus",
            openHour: "10:00-21:00",
            image: "https://placehold.co/260x160/E2E8F0/334155?text=Ramboo+Chicken",
        },
    ];

    // Data dummy Review
    const reviewData = [
        {
            name: "Azzan Isham",
            email: "azzanisham@gmail.com",
            text: "Saya sangat terbantu atas adanya website ini, karena ketika saya bingung mau membeli makanan dimana, di website ini menyediakan arahan.",
            rating: 4,
            date: "17 Oktober 2025",
            profileImage: "https://placehold.co/64x64/E2E8F0/334155?text=AI"
        },
        {
            name: "Jovanco",
            email: "jovancoe@gmail.com",
            text: "Website-nya keren! Tampilannya bersih dan gampang dipakai. Akhirnya ada direktori UMKM Kudus yang lengkap.",
            rating: 4,
            date: "17 Oktober 2025",
            profileImage: "https://placehold.co/64x64/E2E8F0/334155?text=J"
        },
        {
            name: "Budi Santoso",
            email: "budis@gmail.com",
            text: "Sangat informatif. Saya jadi tahu lokasi UMKM yang sebelumnya tidak saya ketahui. Mantap!",
            rating: 5,
            date: "18 Oktober 2025",
            profileImage: "https://placehold.co/64x64/E2E8F0/334155?text=BS"
        },
        {
            name: "Khoirul Anam",
            email: "choriul@gmail.com",
            text: "Subhanallah, website ini sangat membantu pelaku UMKM seperti saya untuk dikenal lebih luas. Terima kasih banyak!",
            rating: 5,
            date: "29 Oktober 2025",
            profileImage: "https://placehold.co/64x64/E2E8F0/334155?text=MC"
        }
    ];

    // Effect scroll auto UMKM
    useEffect(() => {
        const el = umkmScrollRef.current;
        if (el) {
            let scrollPosition = el.scrollLeft;
            const scrollStep = 1;

            const interval = setInterval(() => {
                if (!isPausedUMKM && el) {
                    const scrollWidth = el.scrollWidth / 2;
                    if (scrollWidth === 0) {
                        return;
                    }
                    scrollPosition += scrollStep;
                    if (scrollPosition >= scrollWidth) {
                        scrollPosition = 0;
                        el.scrollLeft = 0;
                    } else {
                        el.scrollLeft = scrollPosition;
                    }
                }
            }, 20);
            return () => clearInterval(interval);
        }
    }, [isPausedUMKM]);

    // Handler scroll manual UMKM
    const handleUMKMScroll = (e) => {
        const el = e.currentTarget;
        if (isPausedUMKM) {
            const scrollLeft = el.scrollLeft;
            const loopPoint = el.scrollWidth / 2;

            if (scrollLeft >= loopPoint) {
                el.scrollLeft = scrollLeft - loopPoint;
            }
            else if (scrollLeft <= 0) {
                el.scrollLeft = scrollLeft + loopPoint;
            }
        }
    };

    // Scroll Review
    const scrollReview = (direction) => {
        const el = reviewScrollRef.current;
        if (!el) return;

        const card = el.querySelector("div > div");
        const cardWidth = card?.offsetWidth || 300;
        const gap = 16; // gap-4 tailwind = 1rem = 16px
        const scrollAmount = cardWidth + gap;

        el.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    // Check Scroll
    const checkScrollReview = () => {
        const el = reviewScrollRef.current;
        if (!el) return;
        setCanScrollLeftReview(el.scrollLeft > 0);
        setCanScrollRightReview(
            el.scrollLeft < el.scrollWidth - el.clientWidth - 1
        );
    };

    // Effect scroll Review
    useEffect(() => {
        const el = reviewScrollRef.current;
        if (el) {
            checkScrollReview();
            const resizeObserver = new ResizeObserver(checkScrollReview);
            resizeObserver.observe(el);
            window.addEventListener("resize", checkScrollReview);

            return () => {
                resizeObserver.unobserve(el);
                window.removeEventListener("resize", checkScrollReview);
            };
        }
    }, []);

    return (
        <div className="bg-light min-h-screen">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section
                className="relative bg-cover bg-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-60"
                style={{ backgroundImage: "url('/images/hero_image_home.jpg')" }}
            >
                <div className="absolute inset-0 bg-dark/50"></div>
                <div className="relative z-10 container mx-auto px-4 py-24 sm:py-20 md:py-24 lg:py-32"> {/* Tingkatkan py di mobile untuk space lebih dari navbar */}
                    <div className="max-w-3xl text-start">
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
                    </div>
                    <div className="mt-10 max-w-4xl flex flex-col md:flex-row gap-3 md:gap-4">
                        <input
                            type="text"
                            placeholder="Cari nama tempat UMKM disini...."
                            className="grow py-3 px-4 rounded-lg border-none focus:ring-2 focus:ring-orange focus:outline-none text-dark/50 shadow-lg bg-light"
                        />
                        <button className="bg-orange text-light py-3 px-5 rounded-lg flex items-center justify-center md:justify-start font-semibold hover:bg-orange-500 transition-colors shadow-lg cursor-pointer">
                            <Icon icon="tabler:search" className="w-4 h-4 mr-2" />
                            Search
                        </button>
                    </div>
                    <div className="mt-8 text-start">
                        <p className="text-light font-normal text-sm lg:text-base">
                            Atau berdasarkan Kategori
                        </p>
                        <div className="mt-4 flex justify-start gap-2 md:gap-4 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    className={`
    rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center shadow-lg
    transition-all transform hover:-translate-y-1 cursor-pointer
    ${cat.active ? "bg-orange text-light" : "bg-light text-dark"}
    hover:bg-orange hover:text-light
  `}
                                    onClick={() => navigate(`/kategori?slug=${cat.slug}`)}
                                >
                                    <Icon icon={cat.icon} className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                                    <span className="text-[10px] sm:text-xs font-semibold text-center line-clamp-1">
                                        {cat.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== HOW TO USE SECTION ===== */}
            <section className="py-16 sm:py-20 px-4 md:px-12 lg:px-20 xl:px-30 relative">
                <div className="container mx-auto px-4">
                    <div
                        className="bg-light rounded-2xl shadow-xl py-8 md:py-12 px-6 sm:px-10 md:px-16 relative z-10 -mt-24 sm:-mt-32 md:-mt-40"
                    >
                        <h2 className="text-xl sm:text-2xl text-start text-dark mb-6 md:mb-10">
                            <span className="font-bold">Bagaimana</span>{" "}
                            <span className="font-normal">Cara Menggunakannya?</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {steps.map((step) => (
                                <div key={step.num} className="flex items-start gap-4">
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

            {/* ===== KECAMATAN SECTION ===== */}
            <section className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative">
                <div className="mb-2 flex justify-between items-center">
                    <h2 className="text-xl sm:text-2xl text-start text-dark">
                        <span className="font-bold">Jelajahi</span>{" "}
                        <span className="font-normal">UMKM Berdasarkan Kecamatan</span>
                    </h2>
                    {/* Tombol navigasi untuk mobile: di atas, satu row dengan judul */}
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

                <style>
                    {`
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
 `}
                </style>

                <div className="relative">
                    <div className="absolute top-0 left-0 w-4 sm:w-6 h-full bg-linear-to-r from-light to-transparent z-10 pointer-events-none" />

                    <motion.div
                        ref={kecamatanScrollRef}
                        onScroll={checkScrollKecamatan}
                        className="overflow-x-auto flex gap-4 py-3 no-scrollbar snap-x"
                    >
                        {kecamatanData.map((kecamatan) => (
                            <div key={kecamatan.slug} className="snap-start">
                                <KecamatanCard data={kecamatan} />
                            </div>
                        ))}
                    </motion.div>

                    <div className="absolute top-0 right-0 w-4 sm:w-6 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />
                </div>

                {/* Tombol navigasi untuk desktop: tetap absolute */}
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

            {/* ===== POTRET UMKM (TITLE) SECTION ===== */}
            <section className="px-4 md:px-8 lg:px-20 xl:px-50 mb-2 relative">
                <h2 className="text-xl sm:text-2xl text-start text-dark">
                    <span className="font-bold">Potret</span>{" "}
                    <span className="font-normal">UMKM Kudus</span>
                </h2>
                <p className="text-dark font-medium text-base mt-2">
                    Melihat lebih dekat keberagaman usaha masyarakat Kudus yang tumbuh
                    dari semangat lokal dan kreativitas.
                </p>
            </section>

            {/* ===== POTRET UMKM (SCROLLER) SECTION ===== */}
            <section className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative">
                <style>
                    {`
     .no-scrollbar::-webkit-scrollbar {
      display: none;
     }
     .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
     `}
                </style>

                <div className="relative">
                    <div className="absolute top-0 left-0 w-4 sm:w-16 h-full bg-linear-to-r from-light to-transparent z-10 pointer-events-none" />

                    <div
                        className="relative w-full overflow-x-auto no-scrollbar"
                        ref={umkmScrollRef}
                        onMouseEnter={() => setIsPausedUMKM(true)}
                        onMouseLeave={() => setIsPausedUMKM(false)}
                        onScroll={handleUMKMScroll}
                    >
                        <motion.div
                            style={{ width: "max-content" }}
                            className="flex gap-4 py-3"
                        >
                            {dummyData.map((item, index) => (
                                <div key={index} className="snap-start">
                                    <UMKMCard data={item} />
                                </div>
                            ))}
                            {dummyData.map((item, index) => (
                                <div key={`duplicate-${index}`} className="snap-start">
                                    <UMKMCard data={item} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="absolute top-0 right-0 w-4 sm:w-16 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />
                </div>
            </section>

            {/* ===== REVIEW SECTION ===== */}
            <section className="py-16 sm:py-20 mb-16 sm:mb-20 px-4 md:px-8 lg:px-20 xl:px-50 bg-dark/5 relative">
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
                    {/* Tombol navigasi untuk mobile: di atas, satu row dengan judul */}
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
                    <motion.div
                        ref={reviewScrollRef}
                        onScroll={checkScrollReview}
                        className="overflow-x-auto flex gap-4 py-10 no-scrollbar snap-x snap-mandatory items-stretch"
                    >
                        {reviewData.map((review, index) => (
                            <div key={index} className="snap-start shrink-0">
                                <ReviewCard review={review} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Tombol navigasi untuk desktop: tetap absolute */}
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
                        onClick={() => navigate("/kontak")}
                        className="bg-orange text-light py-3 px-5 rounded-lg flex items-center justify-center w-full sm:w-auto font-semibold hover:bg-orange-500 transition-colors shadow-lg cursor-pointer"
                    >
                        Beri Kami Ulasan
                        <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </section>

            {/* ===== ARTIKEL SECTION ===== */}
            <section className="pb-16 sm:pb-20 px-4 md:px-8 lg:px-20 xl:px-50 relative">
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
                        Semua Artikel
                        <Icon
                            icon="tabler:chevron-right"
                            className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {dummyArticles.slice(0, 3).map((artikel) => (
                        <ArtikelCard
                            key={artikel.id}
                            image={artikel.image}
                            category={artikel.category}
                            title={artikel.title}
                            displayDate={formatDate(artikel.date)}
                            author={artikel.author}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;