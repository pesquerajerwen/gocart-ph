"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useUserAddressStore } from "@/zustand/user-address-store";
import { Address } from "@prisma/client";
import { Fragment } from "react";

type Props = {
  addresses: Address[];
};

export default function AddressList({ addresses }: Props) {
  const { openCreateAddressDialog } = useUserAddressStore();

  return (
    <RadioGroup className="space-y-2">
      {addresses.map((address, index) => (
        <Fragment key={address.id}>
          <div className="flex gap-4 items-start">
            <div>
              <RadioGroupItem value={""} />
            </div>
            <div className="flex-1 space-y-1">
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
            </div>
            <div>
              <Button
                variant="link"
                className="px-0"
                onClick={openCreateAddressDialog}
              >
                Edit
              </Button>
            </div>
          </div>
          {addresses.length - 1 < index && <Separator />}
        </Fragment>
      ))}
    </RadioGroup>
  );
}
