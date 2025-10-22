import React from "react";
import { Icon } from "@iconify/react";

const ReviewCard = () => {
  return (
    <div className="relative max-w-lg bg-light rounded-lg shadow-sm p-6 pt-10 font-poppins overflow-visible">
      {/* Foto profil setengah di luar card */}
      <div className="absolute -top-6 left-6">
        <img
          src="/images/logo_kudus.png"
          alt="profile"
          className="w-16 h-16 rounded-full object-cover border-4 border-light shadow-md"
        />
      </div>

      {/* Isi card */}
      <div className="flex flex-col space-y-3 mt-2">
        <h3 className="font-semibold text-dark text-base wrap-break-word">
          Azzan Isham{" "}
          <span className="text-dark/50 font-normal text-sm">
            / CEO of Karya Adi Grafika
          </span>
        </h3>

        <p className="text-dark/50 leading-relaxed text-sm wrap-break-word whitespace-pre-line">
          Saya sangat terbantu atas adanya website ini, karena ketika saya
          bingung mau membeli makanan dimana, di website ini menyediakan
          arahan.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </p>
      </div>

      {/* Tanda kutip kanan atas pakai Iconify */}
      <Icon
        icon="iconoir:quote-solid"
        className="absolute top-6 right-8 text-orange text-4xl"
      />

      {/* Tanggal */}
      <p className="text-dark/50 text-sm text-right mt-4">17 Oktober 2025</p>
    </div>
  );
};

export default ReviewCard;
