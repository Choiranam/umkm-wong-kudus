import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-dark/5 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 items-start">
          <div className="flex flex-col items-start justify-center">
            <Link to="/">
              <img
                src="/images/logo_navbar_footer.webp"
                alt="Kudus UMKM"
                className="w-44 md:w-48"
              />
            </Link>
          </div>

          <div>
            <h4 className="text-dark font-bold text-lg mb-4 pb-2 border-b-2 border-orange w-fit">
              Kontak Info
            </h4>
            <div className="space-y-3 text-dark/50 font-medium text-sm">
              <div className="flex items-center space-x-2">
                <Icon icon="mynaui:location" className="w-5 h-5 text-dark/50" />
                <span>Kudus</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  icon="mynaui:telephone"
                  className="w-5 h-5 text-dark/50"
                />
                <span>+62 856-0121-1156</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  icon="ic:outline-email"
                  className="w-5 h-5 text-dark/50"
                />
                <span>mchoiranam@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-dark font-bold text-lg mb-4 pb-2 border-b-2 border-orange w-fit">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Beranda
              </Link>
              <Link
                to="/tentang-umkm"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Tentang UMKM
              </Link>
              <Link
                to="/kontak"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Kontak
              </Link>
              <Link
                to="/tentang-kami"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Tentang Kami
              </Link>
              <Link
                to="/artikel"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Baca Artikel
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-dark font-bold text-lg mb-4 pb-2 border-b-2 border-orange w-fit">
              Kategori UMKM
            </h4>
            <div className="space-y-2">
              <Link
                to="/kategori?slug=makanan"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Makanan
              </Link>
              <Link
                to="/kategori?slug=minuman"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Minuman
              </Link>
              <Link
                to="/kategori?slug=jasa"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Jasa
              </Link>
              <Link
                to="/kategori?slug=barang"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Barang
              </Link>
              <Link
                to="/kategori?slug=lainnya"
                className="block text-dark/50 font-medium text-sm hover:text-orange transition-colors"
              >
                Lainnya
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-10 border-t-2 border-orange/50">
          <p className="text-center text-dark/50 text-sm font-medium">
            © 2025 <span className="font-bold text-dark">UMKM WONG KUDUS.</span>{" "}
            All Rights Reserved. Created by{" "}
            <span className="font-bold text-dark">Amethyst Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
