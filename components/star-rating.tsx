"use client";

import { cn } from "@/utils/tailwind";
import { Star } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

type StarRatingProps = {
  rating: number;
  maxStars?: number;
  className?: string;
  inactiveClassName?: string;
  size?: number;
  gap?: number;
  disabled?: boolean;
  onChange?: (newRating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  className,
  inactiveClassName,
  size = 12,
  gap = 1,
  disabled = false,
  onChange,
}) => {
  return (
    <div className="flex items-center" style={{ gap: `${gap * 0.25}rem` }}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isActive = starValue <= rating;

        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            className={cn(
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            )}
            onClick={() => {
              if (!disabled) onChange?.(starValue);
            }}
          >
            <Star
              size={size}
              className={cn(
                "fill-current transition-colors",
                isActive
                  ? className ?? "text-green-500"
                  : inactiveClassName ?? "text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
