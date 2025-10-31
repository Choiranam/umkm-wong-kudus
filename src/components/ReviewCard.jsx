import React from "react";
import { Icon } from "@iconify/react";

const maskEmail = (email) => {
  if (!email) return "";
  const parts = email.split("@");
  if (parts.length !== 2) return email;

  const [username, domain] = parts;
  if (username.length <= 2) return `${username[0]}**@${domain}`;

  return `${username[0]}********${username[username.length - 1]}@${domain}`;
};

const ReviewCard = ({ review }) => {
  const { name, email, text, rating, date, profileImage } = review;

  return (
    <div
      className="relative bg-light rounded-lg shadow-sm p-6 pt-10 font-poppins 
      overflow-visible flex flex-col h-full min-h-[260px] sm:min-h-[300px] 
      min-w-[260px] sm:min-w-[300px] max-w-[320px]"
    >
      <div className="absolute -top-6 left-4 sm:left-6">
        <img
          src={profileImage}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-4 border-light shadow-md"
        />
      </div>

      <Icon
        icon="iconoir:quote-solid"
        className="absolute top-6 right-6 text-orange text-4xl"
      />

      <div className="flex flex-col justify-between flex-1 mt-4">
        <h3 className="font-semibold text-dark text-base">
          {name}{" "}
          <span className="text-dark/50 font-normal text-sm">
            / {maskEmail(email)}
          </span>
        </h3>

        <p className="text-dark/50 leading-relaxed text-sm mt-2 whitespace-pre-line">
          {text}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                icon="mdi:star"
                className={`text-base ${
                  i < rating ? "text-orange" : "text-dark/50"
                }`}
              />
            ))}
          </div>
          <p className="text-dark/50 text-sm">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
