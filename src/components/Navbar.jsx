import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const { pathname, search } = useLocation();
    const fullPath = pathname + search;

    // Tentukan menu aktif
    let activeMenu = "";
    if (pathname === "/") activeMenu = "beranda";
    else if (pathname === "/tentang-umkm") activeMenu = "tentang-umkm";
    else if (pathname === "/kontak") activeMenu = "kontak";
    else if (pathname === "/tentang-kami") activeMenu = "tentang-kami";
    else if (pathname.startsWith("/kategori")) activeMenu = "kategori";

    const [scrollY, setScrollY] = useState(0);

    // --- TAMBAHAN: State untuk menu mobile ---
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isKategoriOpen, setIsKategoriOpen] = useState(false); // Untuk accordion kategori mobile

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setScrollY(0);
        // --- TAMBAHAN: Tutup menu mobile saat pindah halaman ---
        setIsMobileMenuOpen(false);
        setIsKategoriOpen(false);
    }, [pathname, search]);

    const isAtTop = scrollY <= 50;
    // --- PENYESUAIAN: Pastikan background tidak transparan saat menu mobile terbuka ---
    const bgColor =
        isAtTop && !isMobileMenuOpen ? "bg-dark/0" : "bg-light shadow-sm";
    const textColor =
        isAtTop && !isMobileMenuOpen ? "text-white" : "text-dark";
    const hoverText =
        isAtTop && !isMobileMenuOpen ? "hover:text-orange/80" : "hover:text-orange";

    const logoSrc =
        isAtTop && !isMobileMenuOpen
            ? "/images/logo_kudus.png"
            : "/images/logo_navbar_footer.png";

    const kategoriItems = [
        { icon: "fluent:food-16-regular", text: "Makanan", slug: "makanan" },
        {
            icon: "fluent:drink-to-go-24-regular",
            text: "Minuman",
            slug: "minuman",
        },
        { icon: "ph:wrench", text: "Jasa", slug: "jasa" },
        { icon: "lucide:package-open", text: "Barang", slug: "barang" },
        { icon: "basil:other-1-outline", text: "Lainnya", slug: "lainnya" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full ${bgColor} px-8 py-2.5 z-50 transition-all duration-500 ease-in-out`} // z-index disesuaikan ke 50 (standar)
        >
            <div className="relative flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <Link to="/" className="shrink-0"> {/* Tambah flex-shrink-0 */}
                    <img
                        src={logoSrc}
                        alt="Kudus Logo"
                        className="h-14 w-auto transition-all duration-500"
                    />
                </Link>

                {/* Menu Tengah (Desktop) --- TAMBAHAN: hidden lg:flex --- */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center space-x-8">
                    {/* Beranda */}
                    <Link
                        to="/"
                        className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 ${activeMenu === "beranda"
                            ? `${textColor} font-semibold border-b-4 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        <span>Beranda</span>
                    </Link>

                    {/* Dropdown Kategori (Desktop) */}
                    <div className="relative group">
                        <button
                            className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 cursor-pointer ${activeMenu === "kategori"
                                ? `${textColor} font-medium` // Dibuat sama agar tidak ada border saat hover
                                : `${textColor} font-medium ${hoverText}`
                                }`}
                        >
                            <span>Kategori</span>
                            <Icon
                                icon="tabler:chevron-down"
                                className={`w-3 h-3 transition-transform duration-200 group-hover:rotate-180 ${isAtTop && !isMobileMenuOpen
                                    ? "text-white"
                                    : "text-dark"
                                    }`}
                            />
                        </button>

                        {/* Dropdown Items (Desktop) */}
                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl py-3 z-50 border border-dark/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="space-y-1">
                                {kategoriItems.map(({ icon, text, slug }) => {
                                    const kategoriPath = `/kategori?slug=${slug}`;
                                    const isKategoriActive =
                                        fullPath === kategoriPath;
                                    return (
                                        <Link
                                            key={text}
                                            to={kategoriPath}
                                            className={`group flex items-center px-5 py-3 text-sm font-normal transition-all duration-200 ${isKategoriActive
                                                ? "bg-linear-to-r from-orange/5 to-orange/10 text-orange"
                                                : "text-dark/70 hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange"
                                                }`}
                                        >
                                            <Icon
                                                icon={icon}
                                                className={`w-4 h-4 mr-3 ${isKategoriActive
                                                    ? "text-orange"
                                                    : "text-dark/50 group-hover:text-orange"
                                                    }`}
                                            />
                                            {text}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Tentang UMKM */}
                    <Link
                        to="/tentang-umkm"
                        className={`text-base pb-0.5 transition-colors duration-200 ${activeMenu === "tentang-umkm"
                            ? `${textColor} font-semibold border-b-4 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        Tentang UMKM
                    </Link>

                    {/* Kontak */}
                    <Link
                        to="/kontak"
                        className={`text-base pb-0.5 transition-colors duration-200 ${activeMenu === "kontak"
                            ? `${textColor} font-semibold border-b-4 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        Kontak
                    </Link>

                    {/* Tentang Kami */}
                    <Link
                        to="/tentang-kami"
                        className={`text-base pb-0.5 transition-colors duration-200 ${activeMenu === "tentang-kami"
                            ? `${textColor} font-semibold border-b-4 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        Tentang Kami
                    </Link>
                </div>

                {/* Tombol kanan (Desktop) --- TAMBAHAN: hidden lg:block --- */}
                <Link
                    to="/artikel"
                    className="hidden lg:block px-5 py-2.5 bg-orange text-white text-base font-medium rounded-md transition-all duration-300 transform hover:bg-[#D96230] hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97] whitespace-nowrap"
                >
                    Baca Artikel UMKM
                </Link>

                {/* --- TAMBAHAN: Tombol Hamburger (Mobile) --- */}
                <button
                    className={`lg:hidden p-2 rounded-md transition-colors cursor-pointer ${textColor} ${hoverText}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <Icon
                        icon={isMobileMenuOpen ? "tabler:x" : "tabler:menu-2"}
                        className="w-7 h-7"
                    />
                </button>
            </div>

            {/* --- TAMBAHAN: Mobile Menu Drawer --- */}
            <div
                className={`lg:hidden absolute top-full left-0 w-full bg-light shadow-lg ${isMobileMenuOpen
                    ? "max-h-screen opacity-100 visible"
                    : "max-h-0 opacity-0 invisible"
                    } transition-all duration-500 ease-in-out overflow-y-auto`}
                style={{ maxHeight: "calc(100vh - 80px)" }} // Batasi tinggi agar bisa di-scroll
            >
                <div className="flex flex-col space-y-1 p-4">
                    <Link
                        to="/"
                        className={`text-base block w-full p-3 rounded-lg ${activeMenu === "beranda"
                            ? "bg-orange/10 text-orange font-semibold"
                            : "text-dark font-medium hover:bg-orange/5"
                            }`}
                    >
                        Beranda
                    </Link>

                    {/* Kategori Accordion (Mobile) */}
                    <div>
                        <button
                            onClick={() => setIsKategoriOpen(!isKategoriOpen)}
                            className={`text-base w-full p-3 rounded-lg flex justify-between items-center cursor-pointer ${activeMenu === "kategori"
                                ? "bg-orange/10 text-orange font-semibold"
                                : "text-dark font-medium hover:bg-orange/5"
                                }`}
                        >
                            <span>Kategori</span>
                            <Icon
                                icon="tabler:chevron-down"
                                className={`w-4 h-4 transition-transform ${isKategoriOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {/* Accordion Content */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isKategoriOpen ? "max-h-96" : "max-h-0"
                                }`}
                        >
                            <div className="flex flex-col space-y-1 pt-2 pl-4">
                                {kategoriItems.map(({ icon, text, slug }) => {
                                    const kategoriPath = `/kategori?slug=${slug}`;
                                    const isKategoriActive =
                                        fullPath === kategoriPath;
                                    return (
                                        <Link
                                            key={slug}
                                            to={kategoriPath}
                                            className={`group flex items-center px-3 py-2.5 text-sm font-normal rounded-lg ${isKategoriActive
                                                ? "text-orange font-medium"
                                                : "text-dark/70 hover:bg-orange/5 hover:text-orange"
                                                }`}
                                        >
                                            <Icon
                                                icon={icon}
                                                className={`w-4 h-4 mr-3 ${isKategoriActive
                                                    ? "text-orange"
                                                    : "text-dark/50 group-hover:text-orange"
                                                    }`}
                                            />
                                            {text}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/tentang-umkm"
                        className={`text-base block w-full p-3 rounded-lg ${activeMenu === "tentang-umkm"
                            ? "bg-orange/10 text-orange font-semibold"
                            : "text-dark font-medium hover:bg-orange/5"
                            }`}
                    >
                        Tentang UMKM
                    </Link>
                    <Link
                        to="/kontak"
                        className={`text-base block w-full p-3 rounded-lg ${activeMenu === "kontak"
                            ? "bg-orange/10 text-orange font-semibold"
                            : "text-dark font-medium hover:bg-orange/5"
                            }`}
                    >
                        Kontak
                    </Link>
                    <Link
                        to="/tentang-kami"
                        className={`text-base block w-full p-3 rounded-lg ${activeMenu === "tentang-kami"
                            ? "bg-orange/10 text-orange font-semibold"
                            : "text-dark font-medium hover:bg-orange/5"
                            }`}
                    >
                        Tentang Kami
                    </Link>

                    <div className="pt-2">
                        <Link
                            to="/artikel"
                            className="block w-full text-center px-5 py-3 bg-orange text-white text-base font-medium rounded-lg transition-all duration-300 transform hover:bg-[#D96230] active:scale-[0.98]"
                        >
                            Baca Artikel UMKM
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;