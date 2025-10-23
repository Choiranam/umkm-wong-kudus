import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Navbar = () => {
    const activeMenu = "beranda";
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    return (
        <nav
            className={`fixed top-0 left-0 w-full ${bgColor} px-8 py-2.5 z-999 transition-all duration-500 ease-in-out`}
        >
            <div className="relative flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src={logoSrc}
                        alt="Kudus Logo"
                        className="h-14 w-auto transition-all duration-500"
                    />
                </div>

                {/* Menu Tengah */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-8">
                    <a
                        href="#"
                        className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 ${activeMenu === "beranda"
                            ? `${textColor} font-semibold border-b-3 border-orange`
                            : `${textColor} font-medium ${hoverText}`
                            }`}
                    >
                        <span>Beranda</span>
                    </a>

                    {/* Dropdown */}
                    <div className="relative group">
                        <button
                            className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 cursor-pointer ${activeMenu === "kategori"
                                ? `${textColor} font-bold border-b-3 border-orange`
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

                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl py-3 z-1000 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="space-y-1">
                                {[
                                    { icon: "fluent:food-16-regular", text: "Makanan" },
                                    { icon: "fluent:drink-to-go-24-regular", text: "Minuman" },
                                    { icon: "ph:wrench", text: "Jasa" },
                                    { icon: "lucide:package-open", text: "Barang" },
                                    { icon: "basil:other-1-outline", text: "Lainnya" },
                                ].map(({ icon, text }) => (
                                    <a
                                        key={text}
                                        href="#"
                                        className="group flex items-center px-5 py-3 text-sm text-gray-600 font-normal hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange transition-all duration-200"
                                    >
                                        <Icon
                                            icon={icon}
                                            className="w-4 h-4 mr-3 text-gray-400 group-hover:text-orange"
                                        />
                                        {text}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a
                        href="#"
                        className={`text-base font-medium pb-0.5 transition-colors duration-200 ${textColor} ${hoverText}`}
                    >
                        Tentang UMKM
                    </a>
                    <a
                        href="#"
                        className={`text-base font-medium pb-0.5 transition-colors duration-200 ${textColor} ${hoverText}`}
                    >
                        Kontak
                    </a>
                    <a
                        href="/tentang-kami"
                        className={`text-base font-medium pb-0.5 transition-colors duration-200 ${textColor} ${hoverText}`}
                    >
                        Tentang Kami
                    </a>
                </div>

                {/* Tombol kanan */}
                <a
                    href="#"
                    className={`px-5 py-2.5 bg-orange text-white text-base font-medium rounded-md transition-all duration-300 transform hover:bg-[#D96230] hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97] whitespace-nowrap`}
                >
                    Baca Artikel UMKM
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
