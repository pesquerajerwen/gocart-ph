import axios from "axios";
import { createClient } from "@/utils/supabase-client";
import { FileUploadItem } from "@/components/card-upload";

const supabase = createClient();

type UploadSingleFileProps = {
  file: File;
  fileName: string;
  bucketName: string;
  onProgress?: (percent: number) => void;
  onFail?: (error: string) => void;
};

type UploadFilesWithProgress = {
  fileUploadItems: FileUploadItem[];
  bucketName: string;
  onProgressUpdate?: (id: string, percent: number) => void;
  onUploadFail?: (id: string, error: string) => void;
};

/**
 * Uploads a single file to Supabase Storage with progress tracking.
 */
async function uploadSingleFile({
  file,
  fileName,
  bucketName,
  onProgress,
  onFail,
}: UploadSingleFileProps) {
  // Get signed upload URL
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from(bucketName)
    .createSignedUploadUrl(fileName);

  if (signedUrlError || !signedUrlData) {
    throw new Error(signedUrlError?.message || "Failed to create signed URL");
  }

  // Upload file via Axios
  try {
    await axios.put(signedUrlData.signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (event) => {
        if (event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress?.(percent);
        }
      },
    });
  } catch (error) {
    onFail?.((error as Error)?.message || String(error));

    return null;
  }

  return fileName; // Return the uploaded file's path
}

/**
 * Uploads multiple files concurrently and tracks progress for each.
 */
export async function uploadFilesWithProgress({
  fileUploadItems,
  bucketName,
  onProgressUpdate,
  onUploadFail,
}: UploadFilesWithProgress) {
  const uploads = fileUploadItems.map((fileUploadItem, index) =>
    uploadSingleFile({
      file: fileUploadItem.file as File,
      fileName: fileUploadItem.id,
      bucketName,
      onProgress: (percent) => onProgressUpdate?.(fileUploadItem.id, percent),
      onFail: (error) => onUploadFail?.(fileUploadItem.id, error),
    })
  );

  // Wait for all uploads to complete
  const filePaths = await Promise.all(uploads);
  return filePaths; // e.g., ["product-image-uuid1.png", "product-image-uuid2.png"]
}

/**
 * Gets public URLs for uploaded files.
 */
export async function getPublicUrls(
  bucketName: string,
  filePaths: (string | null)[]
) {
  const urls = filePaths
    .filter((filePath) => filePath !== null)
    .map(async (path) => {
      const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
      return { id: path, url: data.publicUrl };
    });

  return Promise.all(urls);
}
