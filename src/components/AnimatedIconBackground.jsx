import React, { useMemo } from "react";
import { Icon } from "@iconify/react";

const AnimatedIconBackground = ({
  iconCount = 20,
  className = "",
  color = "text-orange-500",
  opacityRange = [0.08, 0.12],
}) => {
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
        opacity:
          opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
        rotate: (Math.random() - 0.5) * 30,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      };
    });
  }, []);

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
    >
      {randomIcons.map((item, i) => (
        <Icon
          key={i}
          icon={item.icon}
          className={`${color} absolute animate-float`}
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
  );
};

export default AnimatedIconBackground;
