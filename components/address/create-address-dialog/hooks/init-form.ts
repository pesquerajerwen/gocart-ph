import { AddressFormValues, addressSchema } from "@/lib/schema/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useInitForm() {
  return useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      address: "",
      zipcode: "",
      isDefault: false,
      provinceList: [],
      cityList: [],
      barangayList: [],
      regionList: [],
    },
  });
}
