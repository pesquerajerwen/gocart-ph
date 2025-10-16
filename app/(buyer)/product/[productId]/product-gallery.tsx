import { ProductWithImages } from "@/lib/types/product";
import Image from "next/image";
import { Fragment, useState } from "react";

type Props = {
  productImages: ProductWithImages["productImages"];
};

export default function ProductGallery({ productImages }: Props) {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);

  return (
    <Fragment>
      <div className="flex sm:flex-col gap-3 w-[90vw] sm:w-auto">
        {productImages.map((img, idx) => (
          <div
            key={idx}
            className="group bg-slate-100 p-4 rounded-sm flex justify-center items-center cursor-pointer size-24"
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img.url}
              alt={`Thumbnail ${idx + 1}`}
              className="max-h-20 sm:max-h-16 w-auto group-hover:scale-105 transition-all"
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center w-[90vw] sm:size-105 bg-slate-100 rounded-sm">
        <Image
          src={selectedImage.url}
          alt="Product Image"
          className="max-h-52 w-auto"
          width={320}
          height={320}
        />
      </div>
    </Fragment>
  );
}
