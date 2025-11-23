"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createProductReviewAction } from "@/lib/actions/create-review";
import {
  createProductReviewClientSchema,
  CreateProductReviewFormValues,
} from "@/lib/schema/product-review";
import { useOrdersStore } from "@/lib/zustand/orders";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ImageUploader from "./image-uploader";
import Rating from "./rating";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ordersKeys } from "@/lib/queryKeys";

export default function RateProductDialog() {
  const queryClient = useQueryClient();

  const selectedOrder = useOrdersStore.use.selectedOrder();
  const rateProductDialog = useOrdersStore.use.rateProductDialog();
  const closeRateProductDialog = useOrdersStore.use.closeRateProductDialog();

  const form = useForm<CreateProductReviewFormValues>({
    defaultValues: {
      rating: 0,
      comment: "",
      images: [],
    },
    resolver: zodResolver(createProductReviewClientSchema),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<CreateProductReviewFormValues> = async ({
    rating,
    comment,
    images,
  }) => {
    if (!selectedOrder) throw Error("No selected order");

    const { success, error } = await createProductReviewAction({
      productId: selectedOrder.productId,
      orderItemId: selectedOrder.id,
      rating,
      comment,
      images: images.map(({ url }) => ({ url })),
    });

    if (!success) {
      return toast.error(error?.message, { position: "top-center" });
    }

    toast.success(
      "Your review is now live. Thanks for sharing your experience!"
    );

    closeRateProductDialog();
    reset();

    queryClient.invalidateQueries({ queryKey: ordersKeys.all });
  };

  return (
    <Dialog
      open={rateProductDialog.isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeRateProductDialog();
          reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-md px-0">
        <DialogHeader className="px-4">
          <DialogTitle>Enjoying your new item?</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Share how satisfied you are with your purchase. It only takes a few
            seconds to leave a rating.
          </DialogDescription>
        </DialogHeader>

        <fieldset disabled={form.formState.isSubmitting}>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="max-h-[70vh] overflow-auto space-y-3  px-4">
                <Rating />

                <div className="space-y-2">
                  <Controller
                    control={control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-slate-500">
                          Write Your Review
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Please share your opinion about the product."
                            className="text-sm resize-none h-24"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <ImageUploader />
                </div>
              </section>
              <div className="px-4 mt-3">
                <Button className="w-full" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}
