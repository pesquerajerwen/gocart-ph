"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 55 * 1024 * 1024; // 5 MB

const createStoreSchema = z.object({
  image: z
    .any()
    .refine((file) => file instanceof File, { message: "No file provided" })

    .refine((file: File) => file.size <= MAX_FILE_SIZE, {
      message: `File too large. Max ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
    }),
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  email: z.email("Invalid email address"),
  contactNumber: z.string().nonempty("Contact number is required"),
  address: z.string().nonempty("Address is required"),
});

type CreateStoreFormValues = z.infer<typeof createStoreSchema>;

export default function CreateStoreForm() {
  const form = useForm<CreateStoreFormValues>({
    defaultValues: {
      name: "",
      description: "",
      email: "",
      contactNumber: "",
      address: "",
    },
    resolver: zodResolver(createStoreSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: CreateStoreFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form className="mt-12 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-slate-500">Store Logo</FormLabel>
              <FormControl>
                <ImageUploader
                  onFileSelect={field.onChange}
                  className="size-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-slate-500">Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your store name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-slate-500">Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-32"
                  placeholder="Enter your store description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-slate-500">Contact Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your store contact number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-slate-500">Address</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-32"
                  placeholder="Enter your store address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-32">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
