"use client";

import { Button } from "@/components/ui/button";
import { createProductAction } from "@/lib/actions/create-product";
import {
  createProductClientSchema,
  CreateProductClientValues,
} from "@/lib/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import ActualPriceField from "./actual-price-field";
import CategoryField from "./category-field";
import DescriptionField from "./description-field";
import NameField from "./name-field";
import OfferPriceField from "./offer-price-field";
import ProductImages from "./product-upload-images";
import StockField from "./stock-field";

const defaultValues = {
  productImages: [],
  name: "",
  description: "",
  actualPrice: 0,
  offerPrice: 0,
  stock: 0,
  categoryName: "",
};

export default function ProductForm() {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(createProductClientSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateProductClientValues) {
    const { success, error } = await createProductAction({
      ...values,
      productImages: values.productImages.map((image, index) => {
        if (index === 0) return { ...image, isPrimary: true };

        return image;
      }),
    });

    if (!success) {
      return toast.error(error?.message, { position: "top-center" });
    }

    toast.success("Product has been added.");

    form.reset(defaultValues);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mt-10"
      >
        <ProductImages />

        <NameField />
        <DescriptionField />

        <div className="grid grid-cols-2 gap-4 items-start">
          <ActualPriceField />

          <OfferPriceField />
        </div>

        <StockField />

        <CategoryField />

        <Button type="submit" className="w-32" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
