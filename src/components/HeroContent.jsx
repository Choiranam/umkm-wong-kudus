import React from "react";
import { motion } from "framer-motion";

const HeroContent = ({ image, title, subtitle }) => {
  return (
    <section className="relative w-full h-[60vh] md:h-screen pt-20 flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Hero Background"
          className="w-full h-full object-cover object-center transition-transform duration-2000 ease-out scale-105"
        />
        <div className="absolute inset-0 bg-dark/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-12 max-w-4xl text-light">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl leading-tight drop-shadow-lg font-bold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.1,
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mt-4 text-base md:text-lg font-light leading-relaxed opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default HeroContent;
