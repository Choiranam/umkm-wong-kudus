import React from "react";

const PageContainer = ({ children, variant = "default", className = "" }) => {
  // Preset layout responsif biar fleksibel di tiap halaman
  const variantStyles = {
    default: "max-w-7xl", // layout standar (sering dipakai)
    wide: "max-w-[90rem]", // buat halaman yang butuh ruang lebar (misal: galeri)
    narrow: "max-w-3xl", // buat halaman dengan konten teks panjang (misal: artikel)
    center: "flex flex-col items-center justify-center text-center", // buat halaman kosong / state center
    full: "w-full px-0", // full width tanpa padding (misal: map, hero)
  };

  return (
    <div
      className={`${variantStyles[variant]} mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
