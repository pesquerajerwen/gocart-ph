import CardUpload, { FileUploadItem } from "@/components/card-upload";
import { CreateProductReviewFormValues } from "@/lib/schema/product-review";
import { getPublicUrls, uploadFilesWithProgress } from "@/utils/upload";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const bucketName = "review_images";

export default function ImageUploader() {
  const { setValue, watch } = useFormContext<CreateProductReviewFormValues>();

  const [files, setFiles] = useState<FileUploadItem[]>([]);

  const images = watch("images");

  async function handleOnChange(paramFiles: FileUploadItem[]) {
    try {
      const newFiles = paramFiles.filter(
        (pf) => !files.some((f) => pf.id === f.id)
      );

      // Step 1: Upload all files with progress tracking
      const filePaths = await uploadFilesWithProgress({
        fileUploadItems: newFiles,
        bucketName,
        onProgressUpdate: (id, percent) => {
          // TODO: Fix the problem where when you upload multiple files, only one progress updates

          setFiles(
            paramFiles.map((f) =>
              f.id === id
                ? {
                    ...f,
                    progress: percent,
                    status: percent === 100 ? "completed" : "uploading",
                  }
                : f
            )
          );
        },
        onUploadFail: (id, error) => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? { ...f, progress: 0, status: "error" as const, error }
                : f
            )
          );
        },
      });

      // Step 2: Get all public URLs from uploaded paths
      const publicUrls = await getPublicUrls(bucketName, filePaths);

      const newImages = publicUrls
        .filter((publicUrl) => !images.some((i) => i.localId === publicUrl.id))
        .map((publicUrl) => ({
          localId: publicUrl.id,
          url: publicUrl.url,
        }));

      setValue("images", [...images, ...newImages]);
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    }
  }

  function onFileRemove(id: string) {
    setValue(
      "images",
      images.filter((img) => img.localId !== id)
    );
  }

  return (
    <CardUpload
      accept="image/*"
      files={files}
      onFilesChange={handleOnChange}
      onFileRemove={onFileRemove}
    >
      <p className="cursor-pointer text-sm text-slate-400">
        Drag & drop or click to upload images of your experience
      </p>
    </CardUpload>
  );
}
