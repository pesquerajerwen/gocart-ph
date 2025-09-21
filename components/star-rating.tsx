"use client";

import { Star } from "lucide-react";
import React from "react";
import clsx from "clsx";

type StarRatingProps = {
  rating: number; // current rating (0 - maxStars)
  maxStars?: number; // default = 5
  onChange?: (newRating: number) => void; // optional click handler
  className?: string; // custom className for active stars
  inactiveClassName?: string; // custom className for inactive stars
  disabled?: boolean; // disables interaction
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  onChange,
  className,
  inactiveClassName,
  disabled = false,
}) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isActive = starValue <= rating;

        return (
          <Star
            key={i}
            size={12}
            className={clsx(
              "fill-current transition-colors",
              isActive
                ? className ?? "text-green-500"
                : inactiveClassName ?? "text-gray-300",
              disabled ? "opacity-50 cursor-default" : "cursor-pointer"
            )}
            onClick={() => {
              if (!disabled) onChange?.(starValue);
            }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
