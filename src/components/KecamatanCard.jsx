import React from "react";
import { motion } from "framer-motion";

const KecamatanCard = () => {
  const kecamatanData = [
    { name: "Bae", placeCount: 27 },
  ];

  return (
    <div className="p-6 flex justify-center items-center">
      <div className="flex gap-4 flex-wrap justify-center">
        {kecamatanData.map((kecamatan) => (
          <motion.div
            key={kecamatan.name}
            className="min-w-[180px] bg-light rounded-[5px] overflow-hidden cursor-pointer group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Gambar - Persegi Panjang VERTIKAL */}
            <div className="relative rounded-[5px] overflow-hidden">
              <img
                src="/images/sampel_kecamatan.png"
                alt={kecamatan.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            </div>

            {/* Bagian teks */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-dark leading-tight group-hover:text-orange transition-colors duration-300">
                {kecamatan.name}
              </h3>
              <p className="text-dark/50 font-medium text-xs mt-2">
                {kecamatan.placeCount} tempat
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KecamatanCard;