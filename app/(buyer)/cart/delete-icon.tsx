"use client";

import { deleteCartAction } from "@/lib/actions/delete-cart";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  productId: string;
};

export default function DeleteIcon({ productId }: Props) {
  const router = useRouter();

  async function handleClick() {
    const { error } = await deleteCartAction({
      productId,
    });

    if (error) {
      return toast.error(error.message);
    }

    router.refresh();
  }

  return (
    <Trash2
      className="text-red-500 size-5 cursor-pointer"
      onClick={handleClick}
    />
  );
}
