import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ forceDark = false }) => {
  const { pathname, search } = useLocation();
  let activeMenu = "";
  if (pathname === "/") activeMenu = "beranda";
  else if (pathname === "/tentang-umkm") activeMenu = "tentang-umkm";
  else if (pathname === "/kontak") activeMenu = "kontak";
  else if (pathname === "/tentang-kami") activeMenu = "tentang-kami";
  else if (pathname.startsWith("/kategori")) activeMenu = "kategori";
  const activeKategoriSlug = new URLSearchParams(search).get("slug");
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isKategoriOpen, setIsKategoriOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setScrollY(0);
    setIsMobileMenuOpen(false);
    setIsKategoriOpen(false);
  }, [pathname]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const isAtTop = forceDark ? false : scrollY <= 50;
  const bgColor = forceDark
    ? "bg-light shadow-sm"
    : isAtTop && !isMobileMenuOpen
    ? "bg-dark/0"
    : "bg-light shadow-sm";
  const textColor = forceDark
    ? "text-dark"
    : isAtTop && !isMobileMenuOpen
    ? "text-white"
    : "text-dark";
  const hoverText = forceDark
    ? "hover:text-orange"
    : isAtTop && !isMobileMenuOpen
    ? "hover:text-orange/80"
    : "hover:text-orange";
  const logoSrc = forceDark
    ? "/images/logo_navbar_footer.webp"
    : isAtTop && !isMobileMenuOpen
    ? "/images/logo_kudus.webp"
    : "/images/logo_navbar_footer.webp";
  const kategoriItems = [
    { icon: "fluent:food-16-regular", text: "Makanan", slug: "makanan" },
    { icon: "fluent:drink-to-go-24-regular", text: "Minuman", slug: "minuman" },
    { icon: "ph:wrench", text: "Jasa", slug: "jasa" },
    { icon: "lucide:package-open", text: "Barang", slug: "barang" },
    { icon: "basil:other-1-outline", text: "Lainnya", slug: "lainnya" },
  ];
  return (
    <nav
      className={`fixed top-0 left-0 w-full ${bgColor} px-8 py-2.5 z-50 transition-all duration-500 ease-in-out`}
    >
      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="shrink-0">
          <img
            src={logoSrc}
            alt="Kudus Logo"
            className="h-14 w-auto transition-all duration-500"
          />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 ${
              activeMenu === "beranda"
                ? `${textColor} font-semibold border-b-4 border-orange`
                : `${textColor} font-medium ${hoverText}`
            }`}
          >
            <span>Beranda</span>
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsKategoriOpen(true)}
            onMouseLeave={() => setIsKategoriOpen(false)}
          >
            <button
              className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 cursor-pointer ${
                activeMenu === "kategori" && !activeKategoriSlug
                  ? `${textColor} font-semibold border-b-4 border-orange`
                  : `${textColor} font-medium ${hoverText}`
              }`}
            >
              <span>Kategori</span>
              <Icon
                icon="tabler:chevron-down"
                className={`w-3 h-3 transition-transform duration-200 ${
                  isKategoriOpen ? "rotate-180" : ""
                } ${
                  forceDark
                    ? "text-dark"
                    : isAtTop && !isMobileMenuOpen
                    ? "text-white"
                    : "text-dark"
                }`}
              />
            </button>
            <div
              className={`absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl py-3 z-50 border border-dark/10 transition-all duration-200 ${
                isKategoriOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div className="space-y-1">
                {kategoriItems.map(({ icon, text, slug }) => {
                  const kategoriPath = `/kategori?slug=${slug}`;
                  const isActive = activeKategoriSlug === slug;
                  return (
                    <Link
                      key={slug}
                      to={kategoriPath}
                      onClick={() => setIsKategoriOpen(false)}
                      className={`group flex items-center px-5 py-3 text-sm font-normal transition-all duration-200 ${
                        isActive
                          ? "bg-linear-to-r from-orange/5 to-orange/10 text-orange"
                          : "text-dark/70 hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange"
                      }`}
                    >
                      <Icon
                        icon={icon}
                        className={`w-4 h-4 mr-3 ${
                          isActive
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
            className={`text-base pb-0.5 transition-colors duration-200 ${
              activeMenu === "tentang-umkm"
                ? `${textColor} font-semibold border-b-4 border-orange`
                : `${textColor} font-medium ${hoverText}`
            }`}
          >
            Tentang UMKM
          </Link>
          <Link
            to="/kontak"
            className={`text-base pb-0.5 transition-colors duration-200 ${
              activeMenu === "kontak"
                ? `${textColor} font-semibold border-b-4 border-orange`
                : `${textColor} font-medium ${hoverText}`
            }`}
          >
            Kontak
          </Link>
          <Link
            to="/tentang-kami"
            className={`text-base pb-0.5 transition-colors duration-200 ${
              activeMenu === "tentang-kami"
                ? `${textColor} font-semibold border-b-4 border-orange`
                : `${textColor} font-medium ${hoverText}`
            }`}
          >
            Tentang Kami
          </Link>
        </div>
        <Link
          to="/artikel"
          className="hidden lg:block px-5 py-2.5 bg-orange text-white text-base font-medium rounded-md transition-all duration-300 transform hover:bg-[#D96230] hover:scale-[1.05] hover:shadow-lg hover:shadow-orange/30 active:scale-[0.97] whitespace-nowrap"
        >
          Baca Artikel UMKM
        </Link>
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
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-light shadow-lg ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } transition-all duration-500 ease-in-out overflow-y-auto`}
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        <div className="flex flex-col space-y-1 p-4">
          <Link
            to="/"
            className={`text-base block w-full p-3 rounded-lg ${
              activeMenu === "beranda"
                ? "bg-orange/10 text-orange font-semibold"
                : "text-dark font-medium hover:bg-orange/5"
            }`}
          >
            Beranda
          </Link>
          <div>
            <button
              onClick={() => setIsKategoriOpen(!isKategoriOpen)}
              className={`text-base w-full p-3 rounded-lg flex justify-between items-center cursor-pointer ${
                activeMenu === "kategori"
                  ? "bg-orange/10 text-orange font-semibold"
                  : "text-dark font-medium hover:bg-orange/5"
              }`}
            >
              <span>Kategori</span>
              <Icon
                icon="tabler:chevron-down"
                className={`w-4 h-4 transition-transform ${
                  isKategoriOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isKategoriOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="flex flex-col space-y-1 pt-2 pl-4">
                {kategoriItems.map(({ icon, text, slug }) => {
                  const kategoriPath = `/kategori?slug=${slug}`;
                  const isActive = activeKategoriSlug === slug;
                  return (
                    <Link
                      key={slug}
                      to={kategoriPath}
                      onClick={() => {
                        setIsKategoriOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`group flex items-center px-3 py-2.5 text-sm font-normal rounded-lg ${
                        isActive
                          ? "text-orange font-medium"
                          : "text-dark/70 hover:bg-orange/5 hover:text-orange"
                      }`}
                    >
                      <Icon
                        icon={icon}
                        className={`w-4 h-4 mr-3 ${
                          isActive
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
            className={`text-base block w-full p-3 rounded-lg ${
              activeMenu === "tentang-umkm"
                ? "bg-orange/10 text-orange font-semibold"
                : "text-dark font-medium hover:bg-orange/5"
            }`}
          >
            Tentang UMKM
          </Link>
          <Link
            to="/kontak"
            className={`text-base block w-full p-3 rounded-lg ${
              activeMenu === "kontak"
                ? "bg-orange/10 text-orange font-semibold"
                : "text-dark font-medium hover:bg-orange/5"
            }`}
          >
            Kontak
          </Link>
          <Link
            to="/tentang-kami"
            className={`text-base block w-full p-3 rounded-lg ${
              activeMenu === "tentang-kami"
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
