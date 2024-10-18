"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShippingProps } from "@/types/shipping"
import { useShipping } from "@/hooks/settings/use-shipping"

type EditAddressDialogProps = {
  children: React.ReactNode
  address: ShippingProps
}

export function EditAddressDialog({ children, address }: EditAddressDialogProps) {
  const { upsertAddress, register, errors, Loading } = useShipping()
  const [open, setOpen] = React.useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await upsertAddress()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="house">House/Apt Number</Label>
            <Input id="house" {...register("house")} defaultValue={address.house} />
            {errors.house && (
              <p className="text-sm text-red-500">{errors.house.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="street">Street</Label>
            <Input id="street" {...register("street")} defaultValue={address.street} />
            {errors.street && (
              <p className="text-sm text-red-500">{errors.street.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} defaultValue={address.city} />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" {...register("state")} defaultValue={address.state} />
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...register("country")} defaultValue={address.country} />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input id="postalCode" {...register("postalCode")} defaultValue={address.postalCode} />
            {errors.postalCode && (
              <p className="text-sm text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
          <Button type="submit" disabled={Loading}>
            {Loading ? "Updating..." : "Update Address"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}