import CardUpload, { FileUploadItem } from "@/components/card-upload";
import { getPublicUrls, uploadFilesWithProgress } from "@/utils/upload";
import { useState } from "react";
import { toast } from "sonner";

export default function ImageUploader() {
  const [uploadFiles, setUploadFiles] = useState<FileUploadItem[]>([]);

  const bucketName = "review_images";

  async function handleOnChange(files: FileUploadItem[]) {
    setUploadFiles(files);

    try {
      // Step 1: Upload all files with progress tracking
      const filePaths = await uploadFilesWithProgress({
        fileUploadItems: files,
        bucketName,
        onProgressUpdate: (index, percent) => {
          setUploadFiles((prev) =>
            prev.map((f, i) =>
              i === index
                ? {
                    ...f,
                    progress: percent,
                    status: percent === 100 ? "completed" : "uploading",
                  }
                : f
            )
          );
        },
        onUploadFail: (index, error) => {
          console.log("failed", error);

          setUploadFiles((prev) =>
            prev.map((f, i) =>
              i === index
                ? { ...f, progress: 0, status: "error" as const, error }
                : f
            )
          );
        },
      });

      // Step 2: Get all public URLs from uploaded paths
      const urls = await getPublicUrls(bucketName, filePaths);

      // Optionally return or store these URLs (e.g. attach to review form)
      return urls;
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    }
  }

  return (
    <CardUpload
      files={uploadFiles}
      onFilesChange={handleOnChange}
      accept="image/*"
    >
      <p className="cursor-pointer text-sm text-slate-400">
        Drag & drop or click to upload images of your experience
      </p>
    </CardUpload>
  );
}
