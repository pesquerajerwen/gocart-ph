"use client";

import { createAddressAction } from "@/lib/actions/create-address";
import { updateAddressAction } from "@/lib/actions/update-address";
import { addressKeys } from "@/lib/queryKeys";
import { AddressFormValues } from "@/lib/schema/address";
import { useUserAddressStore } from "@/lib/zustand/user-address-store";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { useRouter } from "next/navigation";
import {
  barangays,
  cities,
  provinces,
  regions,
} from "select-philippines-address";
import { toast } from "sonner";

export default function useHandleSubmit() {
  const router = useRouter();

  const closeAddressFormDialog =
    useUserAddressStore.use.closeAddressFormDialog();
  const selectedAddress = useUserAddressStore.use.selectedAddress();

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

    const payload = {
      ..._.omit(
        values,
        "regionList",
        "provinceList",
        "cityList",
        "barangayList"
      ),
      id: selectedAddress?.id,
      region: region!.region_name,
      province: province!.province_name,
      city: city!.city_name,
      barangay: barangay!.brgy_name,
    };

    let errorResult = null;

    if (!!selectedAddress) {
      const response = await updateAddressAction(payload);

      errorResult = response?.error;
    } else {
      const response = await createAddressAction(payload);

      errorResult = response?.error;
    }

    if (errorResult) {
      return toast.error(errorResult.message);
    }

    queryClient.invalidateQueries({ queryKey: [addressKeys.primary] });

    router.refresh();

    closeAddressFormDialog();
  };

  return handleSubmit;
}
