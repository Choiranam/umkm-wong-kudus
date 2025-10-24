import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom"; // 1. IMPORT Link dan useLocation

const Navbar = () => {
    // 2. DAPATKAN LOKASI PATH SAAT INI
    const { pathname, search } = useLocation();
    const fullPath = pathname + search; // Untuk menangani query parameter

    // 3. TENTUKAN MENU AKTIF SECARA DINAMIS
    let activeMenu = "";
    if (pathname === "/") {
        activeMenu = "beranda";
    } else if (pathname === "/artikel") {
        // Asumsi: /artikel untuk "Tentang UMKM" dan tombol "Baca Artikel"
        activeMenu = "tentang-umkm";
    } else if (pathname === "/kontak") {
        activeMenu = "kontak";
    } else if (pathname === "/tentang-kami") {
        activeMenu = "tentang-kami";
    }

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update posisi scroll saat route berubah agar efek transparan langsung aktif
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" }); // scroll ke atas setiap kali pindah halaman
        setScrollY(0); // pastikan efek transparan aktif di atas
    }, [pathname]);

    // Jika posisi paling atas (belum discroll)
    const isAtTop = scrollY <= 50;

    // Warna dinamis
    const bgColor = isAtTop ? "bg-dark/0" : "bg-light shadow-sm";
    const textColor = isAtTop ? "text-white" : "text-dark";
    const hoverText = isAtTop ? "hover:text-orange/80" : "hover:text-orange";

    // Logo dinamis
    const logoSrc = isAtTop
        ? "/images/logo_kudus.png" // saat di atas
        : "/images/logo_navbar_footer.png"; // saat scroll

    // Data Kategori untuk Dropdown
    const kategoriItems = [
        {
            icon: "fluent:food-16-regular",
            text: "Makanan",
            slug: "makanan",
        },
        {
            icon: "fluent:drink-to-go-24-regular",
            text: "Minuman",
            slug: "minuman",
        },
        { icon: "ph:wrench", text: "Jasa", slug: "jasa" },
        { icon: "lucide:package-open", text: "Barang", slug: "barang" },
        {
            icon: "basil:other-1-outline",
            text: "Lainnya",
            slug: "lainnya",
        },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full ${bgColor} px-8 py-2.5 z-999 transition-all duration-500 ease-in-out`}
        >
            <div className="relative flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo - Diubah menjadi Link */}
                <Link to="/" className="flex items-center">
                    <img
                        src={logoSrc}
                        alt="Kudus Logo"
                        className="h-14 w-auto transition-all duration-500"
                    />
                </Link>

                {/* Menu Tengah */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-8">
                    {/* Link Beranda */}
                    <Link
                        to="/"
                        className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 ${activeMenu === "beranda"
                            ? `${textColor} font-semibold border-b-3 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        <span>Beranda</span>
                    </Link>

                    {/* Dropdown Kategori */}
                    <div className="relative group">
                        <button
                            className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 cursor-pointer ${activeMenu === "kategori"
                                ? `${textColor} font-semibold border-b-3 border-orange` // diubah dari font-bold
                                : `${textColor} font-medium ${hoverText}`
                                }`}
                        >
                            <span>Kategori</span>
                            <Icon
                                icon="tabler:chevron-down"
                                className={`w-3 h-3 transition-transform duration-200 group-hover:rotate-180 ${isAtTop ? "text-white" : "text-dark"
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu Items - Diubah menjadi Link */}
                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl py-3 z-1000 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="space-y-1">
                                {kategoriItems.map(({ icon, text, slug }) => {
                                    const kategoriPath = `/kategori?=${slug}`;
                                    const isKategoriActive = fullPath === kategoriPath;
                                    return (
                                        <Link
                                            key={text}
                                            to={kategoriPath}
                                            className={`group flex items-center px-5 py-3 text-sm font-normal transition-all duration-200 ${isKategoriActive
                                                ? "bg-linear-to-r from-orange/5 to-orange/10 text-orange"
                                                : "text-gray-600 hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange"
                                                }`}
                                        >
                                            <Icon
                                                icon={icon}
                                                className={`w-4 h-4 mr-3 ${isKategoriActive
                                                    ? "text-orange"
                                                    : "text-gray-400 group-hover:text-orange"
                                                    }`}
                                            />
                                            {text}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Link Tentang UMKM */}
                    <Link
                        to="/tentang-umkm" // Asumsi path, ganti jika perlu
                        className={`text-base pb-0.5 transition-colors duration-200 ${activeMenu === "tentang-umkm"
                            ? `${textColor} font-semibold border-b-3 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        Tentang UMKM
                    </Link>

                    {/* Link Kontak */}
                    <Link
                        to="/kontak"
                        className={`text-base pb-0.5 transition-colors duration-200 ${activeMenu === "kontak"
                            ? `${textColor} font-semibold border-b-3 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        Kontak
                    </Link>

                    {/* Link Tentang Kami */}
                    <Link
                        to="/tentang-kami"
                        className={`text-base pb-0.5 transition-colors duration-200 ${activeMenu === "tentang-kami"
                            ? `${textColor} font-semibold border-b-3 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        Tentang Kami
                    </Link>
                </div>

                {/* Tombol kanan - Diubah menjadi Link */}
                <Link
                    to="/artikel" // Asumsi path, ganti jika perlu
                    className={`px-5 py-2.5 bg-orange text-white text-base font-medium rounded-md transition-all duration-300 transform hover:bg-[#D96230] hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97] whitespace-nowrap`}
                >
                    Baca Artikel UMKM
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;