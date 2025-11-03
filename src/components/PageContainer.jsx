import React, { useMemo } from "react";
import { Icon } from "@iconify/react";

const PageContainer = ({
  children,
  variant = "default",
  className = "",
  iconCount = 25,
}) => {
  const variantStyles = {
    default: "max-w-7xl",
    wide: "max-w-[90rem]",
    narrow: "max-w-3xl",
    center: "flex flex-col items-center justify-center text-center",
    full: "w-full px-0",
  };

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

  const randomIcons = useMemo(() => {
    const gridSize = Math.ceil(Math.sqrt(iconCount));
    const cellSize = 100 / gridSize;

    return Array.from({ length: iconCount }).map((_, i) => {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;

      const baseTop = (row + 0.5) * cellSize;
      const baseLeft = (col + 0.5) * cellSize;

      const topVariation = (Math.random() - 0.5) * (cellSize * 0.5);
      const leftVariation = (Math.random() - 0.5) * (cellSize * 0.5);

      const top = Math.min(100, Math.max(0, baseTop + topVariation));
      const left = Math.min(100, Math.max(0, baseLeft + leftVariation));

      return {
        icon: icons[Math.floor(Math.random() * icons.length)],
        top,
        left,
        size: 24 + Math.random() * 24,
        opacity: 0.08 + Math.random() * 0.04,
        rotate: (Math.random() - 0.5) * 30,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      };
    });
  }, [iconCount]);

  return (
    <div className="relative bg-light mb-4">
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

      <div
        className={`${variantStyles[variant]} relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
