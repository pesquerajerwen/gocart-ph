"use client";

import { Button } from "@/components/ui/button";
import CounterInput from "@/components/ui/counter-input";
import { createCartItemAction } from "@/lib/actions/create-cart";
import { ProductWithImages } from "@/lib/types/product";
import { createClient } from "@/utils/supabase-client";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  product: ProductWithImages;
};

export default function ProductForm({ product }: Props) {
  const supabase = createClient();

  const router = useRouter();

  const [quantity, setQuantity] = useState(0);

  const [isPending, startTransition] = useTransition();

  async function handleClickAddToCart() {
    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) redirect("/login");

    startTransition(async () => {
      const { success } = await createCartItemAction({
        userId,
        productId: product.id,
        quantity,
      });

      if (success) {
        toast.success("Item has been added to your shopping cart", {
          duration: 1000,
          position: "top-center",
        });
      }

      router.refresh();
    });
  }

  return (
    <div className="mt-20 flex flex-col gap-3">
      <p className="text-xl font-bold text-slate-900 flex items-center gap-3">
        Quantity
        <span className="text-slate-500 text-sm font-normal">
          {product.stock} pieces available
        </span>
      </p>
      <div className="flex items-center gap-3">
        <CounterInput
          defaultValue={quantity}
          min={0}
          onChange={(value) => setQuantity(value)}
        />
        <Button
          className="rounded"
          onClick={handleClickAddToCart}
          disabled={isPending}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
