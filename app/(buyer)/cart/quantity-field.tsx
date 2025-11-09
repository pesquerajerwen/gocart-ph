"use client";

import CounterInput from "@/components/ui/counter-input";
import { updateCartItemQuantityAction } from "@/lib/actions/update-cart-item-quantity";
import { ProductWithImages } from "@/lib/types/product";
import { useCartStore } from "@/lib/zustand/cart-store";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type Props = {
  product: ProductWithImages;
  quantity: number;
};

export default function QuantityField({ product, quantity }: Props) {
  const router = useRouter();

  const { openRemoveItemDialog } = useCartStore();

  const [value, setValue] = useState(quantity);

  const debounceHandleChange = useCallback(_.debounce(handleChange, 400), []);

  async function handleChange(inputValue: number) {
    const { error } = await updateCartItemQuantityAction({
      productId: product.id,
      quantity: inputValue,
    });

    if (error) {
      return setValue(quantity);
    }

    router.refresh();
  }

  return (
    <CounterInput
      defaultValue={quantity}
      min={0}
      value={value}
      onChange={(value) => {
        if (value === 0) {
          return openRemoveItemDialog({
            product,
          });
        }

        setValue(value);
        debounceHandleChange(value);
      }}
    />
  );
}
