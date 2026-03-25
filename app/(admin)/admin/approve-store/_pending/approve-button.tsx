import { Button } from "@/components/ui/button";
import { approveStoreAction } from "@/lib/actions/approve-store";
import { storeKeys } from "@/lib/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  storeId: string;
};

export default function ApproveButton({ storeId }: Props) {
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  async function approveStore() {
    startTransition(async () => {
      const { error } = await approveStoreAction({ id: storeId });

      if (error) {
        toast.error(error.message);
      }

      toast.success("Store approved successfully");

      queryClient.invalidateQueries({
        queryKey: storeKeys.byStatus("pending"),
      });
    });
  }

  return (
    <Button className="w-20" onClick={approveStore} disabled={isPending}>
      Approve
    </Button>
  );
}
