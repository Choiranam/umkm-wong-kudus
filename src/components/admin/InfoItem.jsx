import React from "react";
import { Icon } from "@iconify/react";

export default function InfoItem({
  label,
  value,
  icon,
  iconClass = "text-gray-500",
}) {
  return (
    <div className="flex text-sm">
      <span className="w-24 font-medium text-gray-700 flex items-center gap-2">
        {icon && <Icon icon={icon} className={`w-4 h-4 ${iconClass}`} />}
        {label}
      </span>
      <span className="text-gray-600 flex-1">{value}</span>
    </div>
  );
}
