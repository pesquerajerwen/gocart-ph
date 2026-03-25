"use client";

import { Switch } from "@/components/ui/switch";
import { StoreStatus } from "@/generated/prisma/enums";
import { activateStoreAction } from "@/lib/actions/activate-store";
import { deactivateStoreAction } from "@/lib/actions/deactivate-store";
import { storeKeys } from "@/lib/queryKeys";
import { Stores } from "@/lib/types/store";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import React, { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { LIVE_STORE_STATUS } from "./page";

type Props = {
  storeId: string;
  status: StoreStatus;
};

type Error = { message: string };

export default function StoreCardAction({ storeId, status }: Props) {
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  const [optimisticChecked, setOptimisticChecked] = useOptimistic(
    status === "verified",
    (_, newValue: boolean) => newValue,
  );

  function onCheckedChange(checked: boolean) {
    startTransition(async () => {
      setOptimisticChecked(checked);

      try {
        if (checked) {
          const { error } = await activateStoreAction({ id: storeId });
          if (error) throw error;

          await updateCache("verified");
        } else {
          const { error } = await deactivateStoreAction({ id: storeId });
          if (error) throw error;

          await updateCache("deactivated");
        }
      } catch (error: unknown) {
        setOptimisticChecked(!checked);
        toast.error((error as Error).message || "Something went wrong");
      }
    });
  }

  async function updateCache(status: StoreStatus) {
    const queryKey = storeKeys.byStatus(LIVE_STORE_STATUS.join(","));

    await queryClient.cancelQueries({ queryKey });

    const previousData = queryClient.getQueryData(queryKey);

    queryClient.setQueryData(
      queryKey,
      (oldData: InfiniteData<Stores, unknown>) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: page.data.map((store: any) =>
              store.id === storeId ? { ...store, status } : store,
            ),
          })),
        };
      },
    );

    return { previousData };
  }

  return (
    <Switch
      checked={optimisticChecked}
      onCheckedChange={onCheckedChange}
      disabled={isPending}
    />
  );
}
