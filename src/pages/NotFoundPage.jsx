import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import PageContainer from "../components/PageContainer";
import Navbar from "../components/Navbar";

const NotFoundPage = () => {
  return (
    <div className="bg-light min-h-screen overflow-x-hidden w-full flex flex-col">
      <Navbar forceDark={true} />
      <PageContainer variant="default" className="flex-1 pt-24 pb-16 md:pt-32">
        <div className="flex flex-col justify-center items-center text-center space-y-8 max-w-2xl mx-auto px-4">
          {/* Ilustrasi 404 */}
          <img
            src="/images/404notfound.webp"
            alt="Halaman tidak ditemukan"
            className="w-[280px] md:w-[380px] lg:w-[420px] mx-auto drop-shadow-xl"
          />

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark">
            Halaman tidak ditemukan
          </h2>

          <p className="text-dark/60 text-base md:text-lg leading-relaxed max-w-md">
            Oops... halaman yang sedang anda kunjungi saat ini tidak tersedia
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-orange font-semibold text-base md:text-lg hover:text-[#D96230] transition-all duration-300"
          >
            <Icon icon="tabler:arrow-left" className="w-5 h-5" />
            KEMBALI KE BERANDA
          </Link>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
