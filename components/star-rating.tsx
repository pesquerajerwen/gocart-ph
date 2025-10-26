"use client";

import { cn } from "@/utils/tailwind";
import { Star } from "lucide-react";
import React from "react";

type StarRatingProps = {
  rating: number;
  maxStars?: number;
  className?: string;
  inactiveClassName?: string;
  size?: number;
  disabled?: boolean;
  onChange?: (newRating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  className,
  inactiveClassName,
  size = 12,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isActive = starValue <= rating;

        return (
          <Star
            key={i}
            size={size}
            className={cn(
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
