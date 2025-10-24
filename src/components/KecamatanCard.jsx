import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link

// Terima { data } sebagai props
const KecamatanCard = ({ data }) => {
  return (
    // Bungkus dengan Link, arahkan ke rute dinamis
    <Link to={`/kecamatan/${data.slug}`}>
      <motion.div
        key={data.name}
        className="min-w-[180px] bg-light rounded-[5px] overflow-hidden cursor-pointer group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Gambar - Gunakan data.image */}
        <div className="relative rounded-[5px] overflow-hidden">
          <img
            src={data.image} // Gunakan image dari props
            alt={data.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        </div>

        {/* Bagian teks - Gunakan data.name dan data.placeCount */}
        <div className="pt-4">
          <h3 className="text-lg font-bold text-dark leading-tight group-hover:text-orange transition-colors duration-300">
            {data.name}
          </h3>
          <p className="text-dark/50 font-medium text-xs mt-2">
            {data.placeCount} tempat
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default KecamatanCard;