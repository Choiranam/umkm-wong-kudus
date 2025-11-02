import React, { useMemo } from "react";
import { Icon } from "@iconify/react";

const PageContainer = ({
  children,
  variant = "default",
  className = "",
  iconCount = 25, // jumlah icon di background
}) => {
  const variantStyles = {
    default: "max-w-7xl",
    wide: "max-w-[90rem]",
    narrow: "max-w-3xl",
    center: "flex flex-col items-center justify-center text-center",
    full: "w-full px-0",
  };

  // Daftar icon yang digunakan (bisa ditambah jika perlu variasi lebih banyak)
  const icons = [
    "mdi:storefront",
    "lucide:package-open",
    "icon-park-outline:high-heeled-shoes",
    "mdi:star-outline",
    "mdi:heart-outline",
    "ph:wrench",
    "mdi:leaf",
    "fluent:drink-to-go-24-regular",
    "mdi:cash-multiple",
    "fluent:food-16-regular",
  ];

  // Distribusi merata dengan grid presisi dan variasi halus
  const randomIcons = useMemo(() => {
    const gridSize = Math.ceil(Math.sqrt(iconCount)); // Ukuran grid (misal 5x5 untuk 25 icon)
    const cellSize = 100 / gridSize; // Ukuran setiap sel dalam %

    return Array.from({ length: iconCount }).map((_, i) => {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;

      // Posisi base di TENGAH sel grid untuk penyebaran lebih rata
      const baseTop = (row + 0.5) * cellSize;
      const baseLeft = (col + 0.5) * cellSize;

      // Variasi halus ±5% untuk kesan natural tapi tidak berantakan
      const topVariation = (Math.random() - 0.5) * (cellSize * 0.5); // ±25% dari cellSize, tapi efektif ±5% total
      const leftVariation = (Math.random() - 0.5) * (cellSize * 0.5);

      const top = Math.min(100, Math.max(0, baseTop + topVariation));
      const left = Math.min(100, Math.max(0, baseLeft + leftVariation));

      return {
        icon: icons[Math.floor(Math.random() * icons.length)],
        top,
        left,
        size: 24 + Math.random() * 24, // Size lebih konsisten: 24-48px untuk modern look
        opacity: 0.08 + Math.random() * 0.04, // Opacity lembut: 0.08-0.12 untuk elegan ✨
        rotate: (Math.random() - 0.5) * 30, // Rotasi halus: ±15deg agar tidak terlalu random
        duration: 15 + Math.random() * 10, // Animasi 15-25s
        delay: Math.random() * 5,
      };
    });
  }, [iconCount]);

  return (
    <div className="relative overflow-hidden bg-light">
      {/* Layer background icon melayang */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {randomIcons.map((item, i) => (
          <Icon
            key={i}
            icon={item.icon}
            className="text-orange-500 absolute animate-float"
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              opacity: item.opacity,
              transform: `rotate(${item.rotate}deg)`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Konten utama */}
      <div
        className={`${variantStyles[variant]} relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
