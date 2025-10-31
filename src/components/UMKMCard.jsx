import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function UMKMCard({ data }) {
  return (
    <motion.div
      className="w-full max-w-[260px] bg-light rounded-[5px] overflow-hidden cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative rounded-[5px] overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      <div className="pt-4 pb-5 text-left">
        <h3 className="text-[16px] font-bold text-dark leading-snug group-hover:text-orange transition-colors duration-300">
          {data.name}
        </h3>
        <p className="text-dark/60 text-sm font-medium mb-1 flex items-center gap-1">
          <Icon icon="fluent:food-16-regular" width="15" height="15" />
          {data.category}
        </p>

        <p className="text-dark/60 text-xs mt-1 line-clamp-2 mb-3">
          {data.description}
        </p>

        <div className="border-t border-gray-200 my-3"></div>

        <div className="flex items-center text-xs text-dark/50 gap-2 flex-nowrap">
          <div className="flex items-center gap-1 min-w-0">
            <Icon
              icon="gg:pin"
              width="12"
              height="12"
              className="text-orange shrink-0"
            />
            <span className="truncate">{data.location}</span>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-px h-4 bg-gray-300" />
          </div>

          <div className="flex items-center gap-1 min-w-0">
            <Icon
              icon="mdi:clock-outline"
              width="12"
              height="12"
              className="text-green shrink-0"
            />
            <span className="truncate">{data.openHour}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
