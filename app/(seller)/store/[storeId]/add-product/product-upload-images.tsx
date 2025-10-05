"use client";

import ImageUploader from "@/components/ui/image-uploader";

export default function ProductImages() {
  return (
    <div>
      <p className="text-slate-500 mt-10">Product Images</p>
      <div className="flex gap-3 flex-wrap max-w-7xl mt-3">
        <ImageUploader onFileSelect={() => null} className="size-36" />
        <ImageUploader onFileSelect={() => null} className="size-36" />
        <ImageUploader onFileSelect={() => null} className="size-36" />
        <ImageUploader onFileSelect={() => null} className="size-36" />
      </div>
    </div>
  );
}
