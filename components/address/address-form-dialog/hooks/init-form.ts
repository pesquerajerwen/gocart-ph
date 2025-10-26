import { AddressFormValues, addAddressSchema } from "@/lib/schema/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const emptyValues = {
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
};

export default function useInitForm() {
  return useForm<AddressFormValues>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: emptyValues,
  });
}
