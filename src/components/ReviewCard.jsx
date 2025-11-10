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
    <div className="bg-transparent p-5 sm:p-6 font-poppins text-left max-w-full sm:max-w-[420px] mx-auto">
      <div className="flex flex-row items-start gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex sm:flex-none justify-start mb-3 sm:mb-0 sm:mt-1">
          <Icon
            icon="mdi:format-quote-open"
            className="text-orange text-2xl sm:text-3xl md:text-4xl"
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <p className="text-dark italic leading-relaxed text-[14px] sm:text-[15px] md:text-base mb-3">
            {text}
          </p>

          <div className="flex items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mr-3 sm:mr-4 shadow-sm border border-dark/5 shrink-0">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold text-orange text-[15px] sm:text-lg tracking-wide">
                {name}
              </h3>

              <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    icon="mdi:star"
                    className={`text-[14px] sm:text-[18px] ${
                      i < rating ? "text-yellow" : "text-dark/30"
                    }`}
                  />
                ))}
              </div>

              {email && (
                <span className="text-dark/50 text-[11px] sm:text-xs mt-1">
                  {maskEmail(email)} • {date}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
