import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { dataDetailUMKM } from "../data/dataDetailUMKM"; // pastikan path benar

const categories = [
  { name: "Makanan", slug: "makanan", icon: "fluent:food-16-regular" },
  { name: "Minuman", slug: "minuman", icon: "fluent:drink-to-go-24-regular" },
  { name: "Jasa", slug: "jasa", icon: "ph:wrench" },
  { name: "Barang", slug: "barang", icon: "lucide:package-open" },
  { name: "Lainnya", slug: "lainnya", icon: "basil:other-1-outline" },
];

export default function UMKMCard({ data }) {
  // Pastikan data selalu ada
  const safeCategory = data?.category || "Lainnya";
  const safeName = data?.name || "";

  // Cari detail rating dari dataDetailUMKM
  const detail = dataDetailUMKM?.find(
    (item) =>
      item?.slug === data?.slug ||
      item?.name?.toLowerCase() === safeName.toLowerCase()
  );

  const rating = detail?.rating || "4.8 / 5";

  // Cari ikon kategori dengan aman
  const categoryIcon =
    categories.find(
      (cat) =>
        cat?.name?.toLowerCase() === safeCategory?.toLowerCase()
    )?.icon || "fluent:food-16-regular";

  return (
    <motion.div
      className="w-full max-w-[260px] bg-transparent rounded-[5px] overflow-hidden cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative rounded-[5px] overflow-hidden">
        <img
          src={data?.image}
          alt={data?.name}
          className="w-full h-40 object-cover"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>

        <div className="absolute top-2 left-2 bg-light backdrop-blur-sm text-xs font-semibold text-dark px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <Icon
            icon="mdi:star"
            className="text-yellow-500"
            width="14"
            height="14"
          />
          <span>{rating}</span>
        </div>
      </div>

      <div className="pt-4 pb-5 text-left">
        <h3 className="text-[16px] font-bold text-dark leading-snug group-hover:text-orange transition-colors duration-300 truncate block max-w-full">
          {data?.name}
        </h3>

        <p className="text-dark/60 text-sm font-medium mb-1 flex items-center gap-1">
          <Icon icon={categoryIcon} width="15" height="15" />
          {safeCategory}
        </p>

        <p className="text-dark/60 text-xs mt-1 line-clamp-2 mb-3">
          {data?.description}
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
            <span className="truncate">{data?.location}</span>
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
            <span className="truncate">{data?.openHour}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
