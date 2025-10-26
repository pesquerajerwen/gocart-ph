"use client";

import { cn } from "@/utils/tailwind";
import { Image as ImageIcon, Trash } from "lucide-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Button } from "./button";
import Image from "next/image";

interface ImageUploaderProps {
  previewUrl?: string;
  className?: string;
  dropzoneOptions?: DropzoneOptions;
  onFileSelect: (file: File | File[]) => void;
  onFileRemove?: () => void;
}

export default function ImageUploader({
  previewUrl,
  className,
  dropzoneOptions,
  onFileSelect,
  onFileRemove,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      onFileSelect(acceptedFiles[0]);
      setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
    ...dropzoneOptions,
  });

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const hasPreview = !!previewUrl;

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center cursor-pointer transition w-full border-2 border-dashed h-36 p-2 rounded-md",
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-gray-50",
        className
      )}
    >
      <input {...getInputProps()} />

      {hasPreview ? (
        <Fragment>
          <Image
            src={previews[0]}
            alt="Preview"
            fill
            className="object-cover rounded-md "
          />
          <div className="absolute flex top-1 right-1">
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="bg-slate-200/70 hover:bg-slate-50"
              onClick={(e) => {
                e.stopPropagation();

                setPreviews([]);

                onFileRemove && onFileRemove();
              }}
            >
              <Trash className="w-4 h-4 text-slate-800" />
            </Button>
          </div>
        </Fragment>
      ) : (
        <div className={cn("flex flex-col items-center gap-2 text-gray-500 ")}>
          <ImageIcon className="w-10 h-10" />
          <p className="text-sm text-center">
            <span className="font-medium text-gray-700">Click to upload</span>
            or drag and drop
          </p>
        </div>
      )}
    </div>
  );
}
