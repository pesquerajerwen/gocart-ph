"use client";

import { Switch } from "@/components/ui/switch";
import { updateProductStatusAction } from "@/lib/actions/update-product";
import { ClientSideProduct } from "@/lib/types/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  row: ClientSideProduct;
};

export default function StatusSwitch({ row }: Props) {
  const router = useRouter();

  async function onCheckedChange(checked: boolean) {
    const { success, message } = await updateProductStatusAction({
      id: row.id,
      status: checked ? "active" : "deactivated",
    });

    if (success) {
      toast.success(message);

      router.refresh();
    }
  }

  return (
    <div className="flex justify-center">
      <Switch
        checked={row.status === "active"}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
