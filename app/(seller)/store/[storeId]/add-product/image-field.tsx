"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/ui/image-uploader";
import { CreateProductClientValues } from "@/lib/schema/product";
import { createStoreClientSchema } from "@/lib/schema/store";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase-client";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  index: number;
};

export default function ImageField({ index }: Props) {
  const supabase = createClient();

  const { control, watch, setValue, getFieldState, getValues } =
    useFormContext<CreateProductClientValues>();

  const { images } = watch();

  const { error } = getFieldState(`images.${index}.image`);

  function handleOnChange(file: File) {
    const result = createStoreClientSchema.shape.image.safeParse(file);

    if (!result.success) {
      toast.error(result.error.message);

      return;
    }

    const bucketName = "product_images";

    const upload = async () => {
      const fileName = `product-image-${crypto.randomUUID()}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (error) {
        return toast.error(error.message);
      }

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      setValue(`images.${index}.url`, urlData.publicUrl);
    };

    upload();
  }

  return (
    <FormField
      control={control}
      name={`images.${index}.image`}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="flex justify-center text-slate-400">
            {index === 0 && "(Primary)"}
          </FormLabel>
          <FormControl>
            <ImageUploader
              previewUrl={images[index]?.url}
              onFileSelect={(file: File | File[]) => {
                field.onChange(file);

                if (file instanceof File) {
                  handleOnChange(file);
                }
              }}
              className="size-29"
            />
          </FormControl>
          <p
            className={cn(
              "text-xs text-destructive h-4",
              error ? "visible" : "invisible"
            )}
          >
            {error?.message}
          </p>
        </FormItem>
      )}
    />
  );
}
