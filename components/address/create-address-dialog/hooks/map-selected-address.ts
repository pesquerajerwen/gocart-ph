"use client";

import { AddressFormValues } from "@/lib/schema/address";
import { useUserAddressStore } from "@/zustand/user-address-store";
import { useEffect, useTransition } from "react";
import { useFormContext } from "react-hook-form";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

export default function useMapSelectedAddress() {
  const selectedAddress = useUserAddressStore((s) => s.selectedAddress);
  const { reset } = useFormContext<AddressFormValues>();

  const [isPending, startMapping] = useTransition();

  useEffect(() => {
    if (!selectedAddress) return;

    let timeoutId: NodeJS.Timeout;

    const mapAddressToCodes = async () => {
      try {
        const regionList = await regions();

        const region = regionList.find(
          (r) => r.region_name === selectedAddress.region
        );
        if (!region) return;

        const provinceList = await provinces(region.region_code);

        const province = provinceList.find(
          (p) => p.province_name === selectedAddress.province
        );
        if (!province) return;

        const cityList = await cities(province.province_code);

        const city = cityList.find((c) => c.city_name === selectedAddress.city);
        if (!city) return;

        const barangayList = await barangays(city.city_code);

        const barangay = barangayList.find(
          (b) => b.brgy_name === selectedAddress.barangay
        );

        reset({
          fullName: selectedAddress.fullName,
          phone: selectedAddress.phone,
          region: region.region_code,
          province: province.province_code,
          city: city.city_code,
          barangay: barangay?.brgy_code,
          address: selectedAddress.address,
          isDefault: selectedAddress.isDefault ?? false,
          zipcode: selectedAddress.zipcode,
          regionList,
          provinceList,
          cityList,
          barangayList,
        });

        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => resolve(), 1000);
        });
      } catch (err) {
        console.error("Failed to map selected address:", err);
      }
    };

    startMapping(() => mapAddressToCodes());

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedAddress, reset]);

  return { isPending };
}
