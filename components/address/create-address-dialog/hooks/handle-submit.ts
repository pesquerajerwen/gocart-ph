import { createAddressAction } from "@/lib/actions/create-address";
import { addressKeys } from "@/lib/queryKeys";
import { AddressFormValues } from "@/lib/schema/address";
import { useUserAddressStore } from "@/zustand/user-address-store";
import { useQueryClient } from "@tanstack/react-query";
import {
  barangays,
  cities,
  provinces,
  regions,
} from "select-philippines-address";
import { toast } from "sonner";

export default function useHandleSubmit() {
  const { closeCreateAddressDialog } = useUserAddressStore();

  const queryClient = useQueryClient();

  const handleSubmit = async (values: AddressFormValues) => {
    const regionList = await regions();
    const provinceList = await provinces(values.region);
    const cityList = await cities(values.province);
    const barangayList = await barangays(values.city);

    const region = regionList.find((r) => r.region_code === values.region);
    const province = provinceList.find(
      (r) => r.province_code === values.province
    );
    const city = cityList.find((r) => r.city_code === values.city);
    const barangay = barangayList.find((r) => r.brgy_code === values.barangay);

    const { error } = await createAddressAction({
      ...values,
      region: region!.region_name,
      province: province!.province_name,
      city: city!.city_name,
      barangay: barangay!.brgy_name,
    });

    if (error) {
      return toast.error(error.message);
    }

    queryClient.invalidateQueries({ queryKey: [addressKeys.primary] });

    closeCreateAddressDialog();
  };

  return handleSubmit;
}
