import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function UMKMCard() {
  const dummyUMKM = [
    {
      name: "Ramboo Chicken",
      category: "Makanan",
      description:
        "Ramboo Chicken Kudus merupakan usaha kuliner yang menyajikan beragam olahan ayam khas.",
      location: "Kota Kudus",
      openHour: "10.00–21.00",
      image: "/images/sampel_umkm.png", // ganti sesuai asetmu
    },
  ];

  return (
    <div className="p-6 flex justify-center items-center">
      <div className="flex gap-4 flex-wrap justify-center">
        {dummyUMKM.map((item, index) => (
          <motion.div
            key={index}
            className="w-[260px] bg-light rounded-[5px] overflow-hidden cursor-pointer group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Gambar */}
            <div className="relative rounded-[5px] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            </div>

            {/* Isi */}
            <div className="pt-4 text-left">
              <h3 className="text-[16px] font-bold text-dark leading-snug group-hover:text-orange transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-dark/60 text-sm font-medium mb-1 flex items-center gap-1">
                <Icon icon="fluent:food-16-regular" width="15" height="15" />
                {item.category}
              </p>

              <p className="text-dark/60 text-xs mt-1 line-clamp-2 mb-3">
                {item.description}
              </p>

              {/* Garis pemisah */}
              <div className="border-t border-gray-200 my-3"></div>

              {/* Lokasi & jam buka + garis vertikal */}
              <div className="flex justify-between items-center text-xs text-dark/50">
                <div className="flex items-center gap-1">
                  <Icon icon="gg:pin" width="12" height="12" color="#E9743B" />
                  <span>{item.location}</span>
                </div>

                {/* Garis vertikal pemisah */}
                <div className="w-px h-4 bg-gray-300"></div>

                <div className="flex items-center gap-1">
                  <Icon
                    icon="mdi:clock-outline"
                    width="12"
                    height="12"
                    color="#356859"
                  />
                  <span>{item.openHour}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
