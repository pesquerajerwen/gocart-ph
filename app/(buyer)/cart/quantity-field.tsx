"use client";

import CounterInput from "@/components/ui/counter-input";
import { updateCartItemQuantityAction } from "@/lib/actions/update-cart-item-quantity";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type Props = {
  productId: string;
  quantity: number;
};

export default function QuantityField({ productId, quantity }: Props) {
  const router = useRouter();

  const [value, setValue] = useState(quantity);

  const debounceHandleChange = useCallback(_.debounce(handleChange, 400), []);

  async function handleChange(inputValue: number) {
    const { error } = await updateCartItemQuantityAction({
      productId,
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
        setValue(value);
        debounceHandleChange(value);
      }}
    />
  );
}
