import React from "react";
import { motion } from "framer-motion";

const ArtikelCard = () => {
  return (
    <motion.div
      className="max-w-sm bg-light rounded-[5px] overflow-hidden cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gambar Artikel */}
      <div className="relative rounded-[5px] overflow-hidden">
        <img
          src="/images/sampel_artikel.png"
          alt="Kudus Kenalkan Produk UMKM"
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      {/* Konten Artikel */}
      <div className="pt-4">
        <p className="text-dark/70 font-medium text-sm mb-1 text-left">
          Minuman
        </p>
        <h3 className="text-lg font-bold text-dark text-left leading-snug group-hover:text-orange transition-colors duration-300">
          Kudus Kenalkan Produk UMKM Unggulan ke Tingkat Nasional
        </h3>
        <p className="text-dark/50 font-medium text-xs mt-2 text-left">
          17 Agustus 2025 by{" "}
          <span className="text-dark font-medium">Admin</span>
        </p>
      </div>
    </motion.div>
  );
};

export default ArtikelCard;