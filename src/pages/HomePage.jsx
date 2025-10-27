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

const HomePage = () => {
    const categories = [
        { name: "Makanan", icon: "fluent:food-16-regular" },
        { name: "Minuman", icon: "fluent:drink-to-go-24-regular" },
        { name: "Jasa", icon: "ph:wrench" },
        { name: "Barang", icon: "lucide:package-open" },
        { name: "Lainnya", icon: "basil:other-1-outline" },
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

    const artikelData = [
        {
            image: "https://placehold.co/384x224/E2E8F0/334155?text=Artikel+1",
            category: "Minuman",
            title: "Kudus Kenalkan Produk UMKM Unggulan ke Tingkat Nasional",
            displayDate: "Aug 17th, 2025",
            author: "Admin"
        },
        {
            image: "https://placehold.co/384x224/E2E8F0/334155?text=Artikel+2",
            category: "Makanan",
            title: "Produk UMKM di Kudus masuk toko modern",
            displayDate: "Aug 17th, 2025",
            author: "Admin"
        },
        {
            image: "https://placehold.co/384x224/E2E8F0/334155?text=Artikel+3",
            category: "Barang",
            title: "UMKM Kudus Tampil Mengesankan di Jateng Fair 2025, Produk Ecoprint Curi Perhatian",
            displayDate: "Aug 17th, 2025",
            author: "Admin"
        }
    ];

    // Refs untuk masing-masing section
    const kecamatanScrollRef = useRef(null);
    const umkmScrollRef = useRef(null);
    const reviewScrollRef = useRef(null);

    // State untuk kontrol scroll kecamatan
    const [canScrollLeftKecamatan, setCanScrollLeftKecamatan] = useState(false);
    const [canScrollRightKecamatan, setCanScrollRightKecamatan] = useState(true);
    // State untuk kontrol scroll UMKM
    const [isPausedUMKM, setIsPausedUMKM] = useState(false);

    const [canScrollLeftReview, setCanScrollLeftReview] = useState(false);
    const [canScrollRightReview, setCanScrollRightReview] = useState(true);

    const navigate = useNavigate();

    // Fungsi check scroll untuk kecamatan
    const checkScrollKecamatan = () => {
        const el = kecamatanScrollRef.current;
        if (el) {
            setCanScrollLeftKecamatan(el.scrollLeft > 0);
            setCanScrollRightKecamatan(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
        }
    };

    // Fungsi scroll untuk kecamatan
    const scrollKecamatan = (direction) => {
        const el = kecamatanScrollRef.current;
        if (el) {
            const scrollAmount = 200; // 180px kartu + 20px gap
            el.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Effect untuk scroll kecamatan
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

    // Data dummy untuk UMKM
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

    const reviewData = [
        {
            name: "Azzan Isham",
            email: "a********s@gmail.com",
            text: "Saya sangat terbantu atas adanya website ini, karena ketika saya bingung mau membeli makanan dimana, di website ini menyediakan arahan.",
            rating: 4,
            date: "17 Oktober 2025",
            profileImage: "https://placehold.co/64x64/E2E8F0/334155?text=AI"
        },
        {
            name: "Jovanco",
            email: "j********e@gmail.com",
            text: "Website-nya keren! Tampilannya bersih dan gampang dipakai. Akhirnya ada direktori UMKM Kudus yang lengkap.",
            rating: 4,
            date: "17 Oktober 2025",
            profileImage: "https://placehold.co/64x64/E2E8F0/334155?text=J"
        },
        {
            name: "Budi Santoso",
            email: "b********o@gmail.com",
            text: "Sangat informatif. Saya jadi tahu lokasi UMKM yang sebelumnya tidak saya ketahui. Mantap!",
            rating: 5,
            date: "18 Oktober 2025",
            profileImage: "https://placehold.co/64x64/E2E8F0/334155?text=BS"
        }
    ];

    // Effect untuk scroll otomatis UMKM
    useEffect(() => {
        const el = umkmScrollRef.current;
        if (el) {
            // PERBAIKAN 1: Mulai dari posisi scroll saat ini, BUKAN dari 0
            let scrollPosition = el.scrollLeft;
            const scrollStep = 1;

            const interval = setInterval(() => {
                // Logic 'if (!isPausedUMKM)' tetap di dalam interval
                if (!isPausedUMKM && el) {
                    const scrollWidth = el.scrollWidth / 2;

                    if (scrollWidth === 0) {
                        return;
                    }

                    scrollPosition += scrollStep;

                    if (scrollPosition >= scrollWidth) {
                        scrollPosition = 0;
                        el.scrollLeft = 0; // Reset ke awal
                    } else {
                        el.scrollLeft = scrollPosition; // Lanjutkan scroll
                    }
                }
            }, 20);

            return () => clearInterval(interval);
        }
    }, [isPausedUMKM]); // Dependency array tetap, ini sudah benar

    // Fungsi check scroll untuk review
    const checkScrollReview = () => {
        const el = reviewScrollRef.current;
        if (el) {
            setCanScrollLeftReview(el.scrollLeft > 0);
            setCanScrollRightReview(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
        }
    };

    // Fungsi scroll untuk review
    const scrollReview = (direction) => {
        const el = reviewScrollRef.current;
        if (el) {
            const scrollAmount = 512 + 20; // Lebar card (max-w-lg) + gap-5
            el.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Effect untuk scroll review
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

            {/* HERO SECTION */}
            <section
                className="relative bg-cover bg-center px-60"
                style={{ backgroundImage: "url('/images/hero_image_home.jpg')" }}
            >
                <div className="absolute inset-0 bg-dark/50"></div>
                <div className="relative z-10 container mx-auto px-4 py-32 md:py-40">
                    <div className="max-w-3xl text-start">
                        <h1 className="text-4xl md:text-6xl text-light leading-18">
                            <span className="font-bold">Jelajahi</span>{" "}
                            <span className="font-light">
                                Berbagai <br /> UMKM di Kudus!
                            </span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-light/90 font-normal">
                            Temukan beragam produk lokal, kuliner, dan layanan terbaik dari
                            pelaku UMKM asli Kudus.
                        </p>
                    </div>
                    <div className="mt-10 max-w-4xl flex gap-6">
                        <input
                            type="text"
                            placeholder="Cari nama tempat UMKM disini...."
                            className="grow py-4 px-5 rounded-lg border-none focus:ring-2 focus:ring-orange focus:outline-none text-dark shadow-lg bg-light"
                        />
                        <button className="bg-orange text-light py-4 px-6 rounded-lg flex items-center font-semibold hover:bg-orange-500 transition-colors shadow-lg cursor-pointer">
                            <Icon icon="tabler:search" className="w-5 h-5 mr-2" />
                            Search
                        </button>
                    </div>
                    <div className="mt-10 text-start">
                        <p className="text-light font-normal text-lg">Atau berdasarkan Kategori</p>
                        <div className="mt-5 flex justify-start gap-3 md:gap-5 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    className={`
                    rounded-xl w-20 h-20 flex flex-col items-center justify-center shadow-lg
                    transition-all transform hover:-translate-y-1 cursor-pointer
                    ${cat.active ? "bg-orange text-light" : "bg-light text-dark"}
                    hover:bg-orange hover:text-light
                  `}
                                >
                                    <Icon icon={cat.icon} className="w-6 h-6 mb-1" />
                                    <span className="text-xs font-semibold">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW TO USE SECTION */}
            <section className="py-20 px-30 relative">
                <div className="container mx-auto px-4">
                    <div className="bg-light rounded-2xl shadow-xl py-8 md:py-12 px-10 md:px-16 relative z-10 -mt-40">
                        <h2 className="text-2xl text-start text-dark mb-10">
                            <span className="font-bold">Bagaimana</span>{" "}
                            <span className="font-normal">Cara Menggunakannya?</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {steps.map((step) => (
                                <div key={step.num} className="flex items-start gap-4">
                                    <div className="shrink-0 flex flex-col items-center">
                                        <Icon icon="gg:check-o" className="w-10 h-10 text-green/75" />
                                        <span className="text-5xl font-bold text-dark/25 mt-1 leading-none">
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

            {/* SECTION KECAMATAN */}
            <section className="pb-20 px-50 relative">
                <div className="mb-2">
                    <h2 className="text-2xl text-start text-dark">
                        <span className="font-bold">Jelajahi</span>{" "}
                        <span className="font-normal">UMKM Berdasarkan Kecamatan</span>
                    </h2>
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
                    {/* Gradient Fade Kiri */}
                    <div className="absolute top-0 left-0 w-6 h-full bg-linear-to-r from-light to-transparent z-10 pointer-events-none" />

                    <motion.div
                        ref={kecamatanScrollRef}
                        onScroll={checkScrollKecamatan}
                        className="overflow-x-auto flex gap-5 py-4 no-scrollbar snap-x"
                        style={{ maxWidth: "1500px" }}
                    >
                        {kecamatanData.map((kecamatan) => (
                            <div key={kecamatan.slug} className="snap-start">
                                <KecamatanCard data={kecamatan} />
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient Fade Kanan */}
                    <div className="absolute top-0 right-0 w-6 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />
                </div>

                {/* Tombol Navigasi */}
                {/* PERBAIKAN 2: Ubah z-index jadi z-20 agar di atas gradient */}
                <button
                    onClick={() => scrollKecamatan("left")}
                    disabled={!canScrollLeftKecamatan}
                    className="text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 left-30 z-20 cursor-pointer" // <-- z-20
                >
                    <Icon icon="tabler:chevron-left" className="w-5 h-5" />
                </button>
                <button
                    onClick={() => scrollKecamatan("right")}
                    disabled={!canScrollRightKecamatan}
                    className="text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 right-30 z-20 cursor-pointer" // <-- z-20
                >
                    <Icon icon="tabler:chevron-right" className="w-5 h-5" />
                </button>
            </section>

            <section className="px-50 mb-2 relative">
                <h2 className="text-2xl text-start text-dark">
                    <span className="font-bold">Potret</span> <span className="font-normal">UMKM Kudus</span>
                </h2>
                <p className="text-dark text-medium mt-2">
                    Melihat lebih dekat keberagaman usaha masyarakat Kudus yang <br />tumbuh dari semangat lokal dan kreativitas.
                </p>
            </section>

            <section className="pb-20 px-50 relative">
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
                    {/* Gradient Fade Kiri */}
                    <div className="absolute top-0 left-0 w-16 h-full bg-linear-to-r from-light to-transparent z-10 pointer-events-none" />

                    {/* INI ADALAH "VIEWPORT" (JENDELA) */}
                    <div
                        className="relative w-full overflow-x-auto no-scrollbar"
                        ref={umkmScrollRef}
                        onMouseEnter={() => setIsPausedUMKM(true)}
                        onMouseLeave={() => setIsPausedUMKM(false)}
                    >
                        {/* INI ADALAH "CONTENT" YANG BERGERAK */}
                        <motion.div
                            className="flex gap-5 py-4"
                            style={{ width: "max-content" }}
                        >
                            {/* Duplikasi data tetap di sini */}
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

                    {/* Gradient Fade Kanan */}
                    <div className="absolute top-0 right-0 w-16 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />
                </div>
            </section>

            <section className="py-20 mb-20 px-50 bg-dark/5 relative">

                {/* Judul Section (Serasi dengan di atas) */}
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl text-start text-dark">
                            <span className="font-bold">Apa Kata</span>{" "}
                            <span className="font-normal">Mereka?</span>
                        </h2>
                        <p className="text-dark text-medium mt-2">
                            Ulasan dan testimoni nyata dari para pengguna website kami.
                        </p>
                    </div>
                </div>

                {/* Wrapper 'relative' untuk gradient fade */}
                <div className="relative">
                    <motion.div
                        ref={reviewScrollRef}
                        onScroll={checkScrollReview}
                        className="overflow-x-auto flex gap-5 py-12 no-scrollbar snap-x" // py-12 agar foto profil tidak terpotong
                    >
                        {reviewData.map((review, index) => (
                            <div key={index} className="snap-start shrink-0"> {/* shrink-0 agar card tidak penyet */}
                                <ReviewCard review={review} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Tombol Navigasi (Warna light untuk bg gelap) */}
                <button
                    onClick={() => scrollReview("left")}
                    disabled={!canScrollLeftReview}
                    className="text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 left-30 z-20 cursor-pointer"
                >
                    <Icon icon="tabler:chevron-left" className="w-5 h-5" />
                </button>
                <button
                    onClick={() => scrollReview("right")}
                    disabled={!canScrollRightReview}
                    className="text-dark p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 right-30 z-20 cursor-pointer"
                >
                    <Icon icon="tabler:chevron-right" className="w-5 h-5" />
                </button>

                {/* Tombol Beri Ulasan (sesuai gambar) */}
                <div className="flex justify-end">
                    <button onClick={() => navigate('/kontak')} className="bg-orange text-light py-3 px-5 rounded-lg flex items-center font-semibold hover:bg-orange-500 transition-colors shadow-lg cursor-pointer">
                        Beri Kami Ulasan
                        <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </section>

            <section className="pb-20 px-50 relative">

                {/* Judul Section (Serasi dengan di atas) */}
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl text-start text-dark">
                            <span className="font-bold">Beberapa Artikel</span>{" "}
                            <span className="font-normal">Terkait UMKM</span>
                        </h2>
                    </div>

                    {/* Link ke Halaman Artikel */}
                    <Link
                        to="/artikel"
                        className="flex items-center text-dark/70 hover:text-orange font-semibold transition-colors group shrink-0"
                    >
                        Semua Artikel
                        <Icon icon="tabler:chevron-right" className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid untuk Artikel Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {artikelData.map((artikel, index) => (
                        <ArtikelCard
                            key={index}
                            image={artikel.image}
                            category={artikel.category}
                            title={artikel.title}
                            displayDate={artikel.displayDate}
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