"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useUserAddressStore } from "@/lib/zustand/user-address-store";
import { Address } from "@prisma/client";
import { Fragment } from "react";

type Props = {
  addresses: Address[];
  selectedId: string;
  onSelect: (value: string) => void;
};

export default function AddressList({
  addresses,
  selectedId,
  onSelect,
}: Props) {
  const openAddressFormDialog = useUserAddressStore.use.openAddressFormDialog();

  return (
    <RadioGroup
      className="space-y-2"
      value={selectedId}
      onValueChange={onSelect}
    >
      {addresses.map((address, index) => (
        <Fragment key={address.id}>
          <div className="flex gap-4 items-start cursor-pointer">
            <div>
              <RadioGroupItem value={address.id} id={`radio-${address.id}`} />
            </div>
            <label
              htmlFor={`radio-${address.id}`}
              className="flex-1 space-y-1 cursor-pointer"
            >
              <div className="flex gap-3 items-center h-5">
                <p className="text-slate-700 font-semibold">
                  {address.fullName}
                </p>
                <Separator orientation="vertical" />
                <p className="text-slate-500">(+63) {address.phone}</p>
              </div>
              <p className="text-slate-500 text-sm leading-none mt-2">
                {address.address}
              </p>
              <p className="text-slate-500 text-sm leading-none">
                {address.barangay}, {address.city}, {address.province},{" "}
                {address.region}, {address.zipcode}
              </p>
              {address.isDefault && (
                <Badge
                  variant="outline"
                  className="text-primary border-primary rounded"
                >
                  Default
                </Badge>
              )}
            </label>
            <div>
              <Button
                variant="link"
                className="p-0 h-4"
                onClick={(e) => openAddressFormDialog(address)}
              >
                Edit
              </Button>
            </div>
          </div>
          {index < addresses.length - 1 && <Separator />}
        </Fragment>
      ))}
    </RadioGroup>
  );
}
