import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Trash } from "lucide-react";
import { getAllShippingAddresses } from "@/actions/settings/shipping";
import { AddAddressDialog } from "./add-address-dialog";
import { AddressRadioGroup } from "./address-radio";
import { getUserDetails } from "@/actions/user";

export default async function Shipping() {
  const addresses = await getAllShippingAddresses();
  const user = await getUserDetails();
  if(!user) return;
  if (!addresses) return;
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Shipping</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Choose your preferred shipping address
          </p>
        </div>
        <AddAddressDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Address
          </Button>
        </AddAddressDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          {addresses.length > 0 ? (
            <AddressRadioGroup addresses={addresses} defaultSelectedAddressId={user.selectedShippingAddressId} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven't added any addresses yet. Add one to get started!
              </p>
              <AddAddressDialog>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Your First Address
                </Button>
              </AddAddressDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
