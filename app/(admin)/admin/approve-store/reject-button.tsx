import { Button } from "@/components/ui/button";
import { approveStoreAction } from "@/lib/actions/approve-store";
import { rejectStoreAction } from "@/lib/actions/reject-store";
import { pendingStoreKeys } from "@/lib/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  storeId: string;
};

export default function RejectButton({ storeId }: Props) {
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();

  async function rejectStore() {
    startTransition(async () => {
      const { error } = await rejectStoreAction({ id: storeId });

      if (error) {
        toast.error(error.message);
      }

      toast.success("Store rejected successfully");

      queryClient.invalidateQueries({ queryKey: pendingStoreKeys.all });
    });
  }

  return (
    <Button
      className="w-20"
      variant="secondary"
      onClick={rejectStore}
      disabled={isPending}
    >
      Reject
    </Button>
  );
}
