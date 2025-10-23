import React from "react";
import { Icon } from "@iconify/react";

const ReviewCard = () => {
  const rating = 4; // ubah sesuai rating dinamis kalau nanti ambil dari API

  return (
    <div className="relative max-w-lg bg-light rounded-lg shadow-sm p-6 pt-10 font-poppins overflow-visible">
      {/* Foto profil setengah di luar card */}
      <div className="absolute -top-6 left-6">
        <img
          src="/images/sampel_foto_profil.jpg"
          alt="profile"
          className="w-16 h-16 rounded-full object-cover border-4 border-light shadow-md"
        />
      </div>

      {/* Isi card */}
      <div className="flex flex-col space-y-3 mt-2">
        <h3 className="font-semibold text-dark text-base wrap-break-word">
          Azzan Isham{" "}
          <span className="text-dark/50 font-normal text-sm">
            / a********s@gmail.com
          </span>
        </h3>

        <p className="text-dark/50 leading-relaxed text-sm wrap-break-word whitespace-pre-line">
          Saya sangat terbantu atas adanya website ini, karena ketika saya
          bingung mau membeli makanan dimana, di website ini menyediakan
          arahan.
        </p>
      </div>

      {/* Tanda kutip kanan atas */}
      <Icon
        icon="iconoir:quote-solid"
        className="absolute top-6 right-8 text-orange text-4xl"
      />

      {/* Bagian bawah: rating & tanggal */}
      <div className="flex justify-between items-center mt-4">
        {/* Rating bintang */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              icon="mdi:star"
              className={`text-base ${i < rating ? "text-orange" : "text-dark/50"}`}
            />
          ))}
        </div>

        {/* Tanggal */}
        <p className="text-dark/50 text-sm">17 Oktober 2025</p>
      </div>
    </div>
  );
};

export default ReviewCard;
