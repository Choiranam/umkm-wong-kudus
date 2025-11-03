import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const KecamatanCard = ({ data }) => {
  return (
    <Link to={`/kecamatan/${data.slug}`}>
      <motion.div
        key={data.name}
        className="min-w-[180px] bg-transparent rounded-[5px] overflow-hidden cursor-pointer group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative rounded-[5px] overflow-hidden">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        </div>

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
