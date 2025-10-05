"use client";

import { Button } from "@/components/ui/button";
import {
  CreateStoreClientValues,
  createStoreClientSchema,
} from "@/lib/schema/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import AddressField from "./address-field";
import ContactField from "./contact-field";
import ImageField from "./image-field";
import NameField from "./name-field";
import { createStoreAction } from "@/lib/actions/create-store";
import DescriptionField from "./description-field";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import EmailField from "./email-field";
import { LoaderCircle } from "lucide-react";

export default function CreateStoreForm() {
  const form = useForm<CreateStoreClientValues>({
    defaultValues: {
      name: "",
      description: "",
      email: "",
      contact: "",
      address: "",
    },
    resolver: zodResolver(createStoreClientSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (data: CreateStoreClientValues) => {
    const { success, error, storeId } = await createStoreAction({
      ...data,
      avatar_url: data.imageUrl,
    });

    if (!success) {
      return toast.error(error?.message, { position: "top-center" });
    }

    redirect(`/store/${storeId}`);
  };

  return (
    <FormProvider {...form}>
      <fieldset disabled={isSubmitting}>
        <form className="mt-12 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <ImageField />
          <NameField />
          <DescriptionField />
          <EmailField />
          <ContactField />
          <AddressField />
          <Button type="submit" className="w-32" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </fieldset>
    </FormProvider>
  );
}
