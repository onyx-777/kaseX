"use client";

import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, Trash } from "lucide-react";
import { GetShippingAddresses } from "@/types/shipping";
import { useShipping } from "@/hooks/settings/use-shipping";
import { EditAddressDialog } from "./edit-address-dialog";
import { setShippingAddressId } from "@/actions/settings/shipping";
import { useRouter } from "next/navigation";

type AddressRadioGroupProps = {
  addresses: GetShippingAddresses;
  defaultSelectedAddressId: string | null;
};

export function AddressRadioGroup({
  addresses,
  defaultSelectedAddressId,
}: AddressRadioGroupProps) {
  if (!addresses || addresses.length === 0) return null;
  const [selectedAddressId, setSelectedAddressId] = React.useState(
    defaultSelectedAddressId ? defaultSelectedAddressId : addresses[0]?.id
  );
  const { deleteAddress } = useShipping();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await setShippingAddressId(selectedAddressId);
      router.refresh();
    };

    fetchData();
  }, [selectedAddressId]);

  return (
    <RadioGroup
      value={selectedAddressId}
      onValueChange={setSelectedAddressId}
      className="space-y-4"
    >
      {addresses.map((address) => (
        <div key={address.id} className="flex items-start space-x-4">
          <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
          <Label
            htmlFor={address.id}
            className="flex flex-1 items-start justify-between p-4 rounded-md border cursor-pointer hover:bg-muted"
          >
            <div className="space-y-1">
              <p className="font-medium">{address.house}</p>
              <p className="text-sm text-muted-foreground">
                {address.street}, {address.city}, {address.state},{" "}
                {address.country}, {address.postalCode}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 items-center ml-4">
              <EditAddressDialog address={address}>
                <Button size="icon" variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </EditAddressDialog>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => deleteAddress(address.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
