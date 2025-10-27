import React from "react";
import { Icon } from "@iconify/react";

const ReviewCard = ({ review }) => {
  const { name, email, text, rating, date, profileImage } = review;

  return (
    <div className="relative max-w-lg bg-light rounded-lg shadow-sm p-6 pt-10 font-poppins overflow-visible h-full flex flex-col"> {/* <-- TAMBAH: h-full, flex, flex-col */}

      {/* Foto profil (Tidak berubah) */}
      <div className="absolute -top-6 left-6">
        <img
          src={profileImage}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-4 border-light shadow-md"
        />
      </div>

      {/* Tanda kutip (Tidak berubah) */}
      <Icon
        icon="iconoir:quote-solid"
        className="absolute top-6 right-8 text-orange text-4xl"
      />

      {/* TAMBAH: Wrapper baru untuk mendorong footer ke bawah */}
      <div className="flex flex-col justify-between h-full">

        {/* Bagian Atas (Header + Text) */}
        <div className="flex flex-col space-y-3 mt-2">
          <h3 className="font-semibold text-dark text-base wrap-break-word">
            {name}{" "}
            <span className="text-dark/50 font-normal text-sm">
              / {email}
            </span>
          </h3>
          <p className="text-dark/50 leading-relaxed text-sm wrap-break-word whitespace-pre-line">
            {text}
          </p>
        </div>

        {/* Bagian bawah (Footer) */}
        <div className="flex justify-between items-center mt-4">
          {/* Rating bintang */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon
                key={i}
                icon="mdi:star"
                className={`text-base ${i < rating ? "text-orange" : "text-dark/50"
                  }`}
              />
            ))}
          </div>
          {/* Tanggal */}
          <p className="text-dark/50 text-sm">{date}</p>
        </div>

      </div> {/* <-- Penutup wrapper baru */}
    </div>
  );
};

export default ReviewCard;