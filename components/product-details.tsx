"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Tag, Earth, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StarRating from "./star-rating";
import CounterInput from "./ui/counter-input";

interface ProductDetailsProps {
  title: string;
  images: StaticImageData[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount?: number;
}

export default function ProductDetails({
  title,
  images,
  price,
  originalPrice,
  rating,
  reviewsCount = 0,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section className="flex flex-wrap gap-12">
      {/* Left Section - Images */}
      <div className="flex max-sm:flex-col-reverse gap-3">
        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-3 w-[90vw] sm:w-auto">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group bg-slate-100 p-4 rounded-sm flex justify-center items-center cursor-pointer size-24"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="max-h-20 sm:max-h-16 w-auto group-hover:scale-105 transition-all"
                width={80}
                height={80}
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex justify-center items-center w-[90vw] sm:size-105 bg-slate-100 rounded-sm">
          <Image
            src={selectedImage}
            alt={title}
            className="max-h-52 w-auto"
            width={320}
            height={320}
          />
        </div>
      </div>

      {/* Right Section - Info */}
      <div className="flex flex-col flex-1">
        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-3">
          <StarRating rating={rating} />
          <span className="text-sm text-slate-600">
            {reviewsCount} {reviewsCount === 1 ? "review" : "reviews"}
          </span>
        </div>

        {/* Price & Discount */}
        <div className="flex items-start gap-3 mt-5">
          <span className="text-2xl text-slate-900 font-bold">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-xl text-slate-500 font-bold line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Savings Info */}
        {originalPrice && (
          <div className="flex items-center gap-2 text-slate-500">
            <Tag className="size-4" />
            Save {Math.round(((originalPrice - price) / originalPrice) * 100)}%
            right now
          </div>
        )}

        {/* Quantity + Add to Cart */}
        <div className="mt-20 flex flex-col gap-3">
          <p className="text-xl font-bold text-slate-900">Quantity</p>
          <div className="flex items-center gap-3">
            <CounterInput defaultValue={0} min={0} />
            <Button className="rounded">Add To Cart</Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Selling Points */}
        <div className="flex flex-col gap-3">
          <p className="flex items-center text-slate-500 gap-3 text-sm">
            <Earth className="size-4" /> Free shipping worldwide
          </p>
          <p className="flex items-center text-slate-500 gap-3 text-sm">
            <CreditCard className="size-4" /> 100% Secured Payment
          </p>
          <p className="flex items-center text-slate-500 gap-3 text-sm">
            <User className="size-4" /> Trusted by top brands
          </p>
        </div>
      </div>
    </section>
  );
}
