import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function UMKMCard() {
  const [hovered, setHovered] = useState(null);

  const dummyUMKM = [
    {
      name: "Ramboo Chicken",
      category: "Makanan",
      description:
        "Ramboo Chicken Kudus merupakan usaha kuliner yang menyajikan beragam olahan ayam khas.",
      location: "Kota Kudus",
      openHour: "10.00–21.00",
      imageUrl: "https://via.placeholder.com/400x250.png?text=UMKM+Image",
    },
    {
      name: "Kopi Seduh Santai",
      category: "Minuman",
      description:
        "Kopi Seduh Santai menawarkan berbagai minuman kopi lokal dengan cita rasa khas Indonesia.",
      location: "Kota Kudus",
      openHour: "08.00–22.00",
      imageUrl: "https://via.placeholder.com/400x250.png?text=UMKM+Image",
    },
    {
      name: "Batik Tulis Lestari",
      category: "Kerajinan",
      description:
        "Batik Tulis Lestari menghadirkan kain batik khas Kudus dengan motif klasik dan modern.",
      location: "Kota Kudus",
      openHour: "09.00–17.00",
      imageUrl: "https://via.placeholder.com/400x250.png?text=UMKM+Image",
    },
    {
      name: "Roti Manis Bahagia",
      category: "Kuliner",
      description:
        "Roti Manis Bahagia menjual aneka roti homemade yang lembut dan enak untuk segala suasana.",
      location: "Kota Kudus",
      openHour: "07.00–20.00",
      imageUrl: "https://via.placeholder.com/400x250.png?text=UMKM+Image",
    },
    {
      name: "Keripik Kress",
      category: "Cemilan",
      description:
        "Keripik Kress memproduksi keripik singkong pedas dengan berbagai level rasa.",
      location: "Kota Kudus",
      openHour: "09.00–21.00",
      imageUrl: "https://via.placeholder.com/400x250.png?text=UMKM+Image",
    },
  ];

  return (
    <div className="p-6 bg-[#f9f6ee]">
      <div className="flex gap-4">
        {dummyUMKM.map((item, index) => (
          <motion.div
            key={index}
            className="min-w-[220px] rounded-[5px] overflow-hidden bg-[#f9f6ee]"
            onHoverStart={() => setHovered(index)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ scale: 1.02 }}
          >
            {/* Gambar */}
            <div className="h-[200px] w-full bg-gray-200 flex items-center justify-center text-dark/50 text-sm rounded-[5px] overflow-hidden">
              {item.name} Placeholder
            </div>

            {/* Bagian teks */}
            <div className="py-3 bg-light text-left">
              <h3
                className={`text-base font-bold transition-colors duration-200 ${
                  hovered === index ? "text-orange" : "text-dark"
                }`}
              >
                {item.name}
              </h3>

              <div className="flex items-center gap-1 text-sm text-dark/70 mb-1">
                <Icon icon="fluent:food-16-regular" width="14" height="14" />
                <span>{item.category}</span>
              </div>

              <p className="text-sm text-dark/70 font-medium line-clamp-2 mb-3">
                {item.description}
              </p>

              {/* Garis pemisah sebelum lokasi */}
              <div className="border-t border-[#d6d3cc] mb-2"></div>

              <div className="flex justify-between items-center text-sm text-dark/70">
                <div className="flex items-center gap-1">
                  <Icon icon="gg:pin" width="14" height="14" color="#E9743B" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon
                    icon="mdi:clock-outline"
                    width="14"
                    height="14"
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
