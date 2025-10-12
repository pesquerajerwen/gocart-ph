"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/ui/image-uploader";
import {
  createStoreClientSchema,
  CreateStoreClientValues,
} from "@/lib/schema/store";
import { createClient } from "@/utils/supabase-client";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export default function ImageField() {
  const supabase = createClient();

  const { control, watch, setValue } =
    useFormContext<CreateStoreClientValues>();

  const { imageUrl } = watch();

  function handleOnChange(file: File) {
    const result = createStoreClientSchema.shape.image.safeParse(file);

    if (!result.success) {
      toast.error(result.error.message);
      return;
    }

    const bucketName = "store_avatars";

    const upload = async () => {
      const fileName = `store-avatar-${crypto.randomUUID()}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (error) {
        return toast.error(error.message);
      }

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      setValue("imageUrl", urlData.publicUrl);
    };

    upload();
  }

  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-slate-500">Store Logo</FormLabel>
          <FormControl>
            <ImageUploader
              previewUrl={imageUrl}
              onFileSelect={(file: File | File[]) => {
                field.onChange(file);

                if (file instanceof File) {
                  handleOnChange(file);
                }
              }}
              className="size-32"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
