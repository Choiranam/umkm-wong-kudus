import React from "react";

const ArtikelCard = () => {
  return (
    <div className="max-w-sm bg-light rounded-lg overflow-hidden cursor-pointer">
      {/* Gambar Artikel */}
      <div className="relative">
        <img
          src="/images/sampel_artikel.png"
          alt="Kudus Kenalkan Produk UMKM"
          className="w-full h-56 object-cover"
        />
      </div>

      {/* Konten Artikel */}
      <div>
        <p className="pt-2 text-dark/50 font-medium text-sm mb-1 text-left">
          Minuman
        </p>
        <h3 className="text-lg font-bold text-dark text-left leading-snug">
          Kudus Kenalkan Produk UMKM Unggulan ke Tingkat Nasional
        </h3>
        <p className="text-dark/50 font-medium text-xs mt-2 text-left">
          17 Agustus 2025 by{" "}
          <span className="text-dark font-medium">Admin</span>
        </p>
      </div>
    </div>
  );
};

export default ArtikelCard;
