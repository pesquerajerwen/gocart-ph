"use client";

import { Switch } from "@/components/ui/switch";
import { activateStoreAction } from "@/lib/actions/activate-store";
import { deactivateStoreAction } from "@/lib/actions/deactivate-store";
import React, { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  storeId: string;
};

export default function StoreCardAction({ storeId }: Props) {
  const [isPending, startTransition] = useTransition();

  function onCheckedChange(checked: boolean) {
    startTransition(async () => {
      if (checked) {
        const { error } = await deactivateStoreAction({ id: storeId });

        if (error) {
          toast.error(error.message);
        }
      } else {
        const { error } = await activateStoreAction({ id: storeId });
        if (error) {
          toast.error(error.message);
        }
      }
    });
  }

  return (
    <React.Fragment>
      <p className="text-slate-400 text-sm">Active</p>{" "}
      <Switch onCheckedChange={onCheckedChange} />
    </React.Fragment>
  );
}
