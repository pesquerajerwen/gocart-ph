"use client";

import { Switch } from "@/components/ui/switch";
import { updateProductStatusAction } from "@/lib/actions/update-product";
import { ProductWithImages } from "@/lib/types/product";
import { ProductStatus } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  row: ProductWithImages;
};

export default function StatusSwitch({ row }: Props) {
  const router = useRouter();

  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    row.status,
    (currentState, status: ProductStatus) => status
  );

  const [isPending, startTransition] = useTransition();

  async function onCheckedChange(checked: boolean) {
    const prevValue = optimisticStatus;

    startTransition(async () => {
      setOptimisticStatus(checked ? "active" : "deactivated");

      const { success, message } = await updateProductStatusAction({
        id: row.id,
        status: checked ? "active" : "deactivated",
      });

      if (!success) {
        return setOptimisticStatus(prevValue);
      }

      toast.success(message);

      router.refresh();
    });
  }

  return (
    <div className="flex justify-center">
      <Switch
        checked={optimisticStatus === "active"}
        disabled={isPending}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
