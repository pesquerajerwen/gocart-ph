import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderItemStatusAction } from "@/lib/actions/update-order-item-status";
import { toast } from "sonner";

type Props = {
  orderItemId: string;
  status: string;
};

export default function StatusSelect({ orderItemId, status }: Props) {
  async function handleOnChange(value: string) {
    const { success, error } = await updateOrderItemStatusAction({
      id: orderItemId,
      status: value,
    });

    if (success) toast.success("Status successfully updated");
    else toast.error(error?.message);
  }

  return (
    <div className="flex justify-center">
      <Select defaultValue={status} onValueChange={handleOnChange}>
        <SelectTrigger className="w-auto border-0 shadow-none border-input focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[state=open]:shadow-none">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
