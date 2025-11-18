"use client";

import CardUpload from "@/components/card-upload";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOrdersStore } from "@/lib/zustand/orders";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState, useMemo } from "react";
import ImageUploader from "./image-uploader";

export default function RateProductDialog() {
  const rateProductDialog = useOrdersStore.use.rateProductDialog();
  const closeRateProductDialog = useOrdersStore.use.closeRateProductDialog();

  const [rating, setRating] = useState(0);

  const ratingLabel = useMemo(() => {
    switch (rating) {
      case 1:
        return "Terrible";
      case 2:
        return "Poor";
      case 3:
        return "Average";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  }, [rating]);

  return (
    <Dialog
      open={rateProductDialog.isOpen}
      onOpenChange={(open) => !open && closeRateProductDialog()}
    >
      <DialogContent className="sm:max-w-md px-0">
        <DialogHeader className="px-4">
          <DialogTitle>Enjoying your new item?</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Share how satisfied you are with your purchase. It only takes a few
            seconds to leave a rating.
          </DialogDescription>
        </DialogHeader>

        <section className="max-h-[70vh] overflow-auto space-y-3  px-4">
          <div className="flex flex-col items-center my-8 space-y-2">
            <StarRating
              rating={rating}
              size={40}
              gap={3}
              onChange={(value) => setRating(value)}
            />
            {rating > 0 && (
              <span className="text-sm  text-slate-400">{ratingLabel}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-slate-500">Write Your Review</Label>
            <Textarea
              placeholder="Please share your opinion about the product."
              className="text-sm resize-none h-24"
            />
          </div>

          <div>
            <ImageUploader />
          </div>
        </section>
        <div className="px-4">
          <Button className="w-full">Submit Review</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
