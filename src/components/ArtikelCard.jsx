import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ArtikelCard = ({ image, category, title, displayDate, author }) => {
  const navigate = useNavigate();

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const handleClick = () => {
    navigate(`/artikel/${category.toLowerCase()}/${slugify(title)}`);
  };

  return (
    <motion.div
      className="max-w-sm bg-light rounded-[5px] overflow-hidden cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="relative rounded-[5px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      <div className="pt-4">
        <p className="text-dark/70 font-medium text-sm mb-1 text-left">
          {category}
        </p>
        <h3 className="text-lg font-bold text-dark text-left leading-snug group-hover:text-orange transition-colors duration-300">
          {title}
        </h3>
        <p className="text-dark/50 font-medium text-xs mt-2 text-left">
          {displayDate} oleh{" "}
          <span className="text-dark font-medium">{author}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default ArtikelCard;
