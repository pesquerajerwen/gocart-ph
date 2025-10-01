"use client";

import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onFileSelect: (file: File | File[]) => void;
  className?: string;
  dropzoneOptions?: DropzoneOptions;
  multiple?: boolean;
}

export default function ImageUploader({
  onFileSelect,
  className,
  dropzoneOptions,
  multiple = false,
}: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      onFileSelect(multiple ? acceptedFiles : acceptedFiles[0]);
      setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
    [onFileSelect, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple,
    maxFiles: multiple ? 5 : 1,
    onDrop,
    ...dropzoneOptions, // ✅ merge user options
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer transition w-full h-36 p-2",
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-gray-50",
        className // ✅ user overrides
      )}
    >
      <input {...getInputProps()} />

      {previews.length > 0 ? (
        multiple ? (
          <div className="grid grid-cols-3 gap-2 w-full h-full overflow-y-auto">
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx + 1}`}
                className="h-24 w-full object-cover rounded-md"
              />
            ))}
          </div>
        ) : (
          <img
            src={previews[0]}
            alt="Preview"
            className="h-full object-contain rounded-md"
          />
        )
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-500">
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
