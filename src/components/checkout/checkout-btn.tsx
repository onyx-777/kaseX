'use client'

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import CheckoutModel from "./modal-index"
import { CaseData } from "@/types/case"
import { GetShippingAddresses } from "@/types/shipping"

type Props = {
  caseData: CaseData
  addresses: GetShippingAddresses
}

export default function CheckoutButton({ caseData, addresses }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] h-[90vh] max-h-[800px]">
        <DialogHeader>
          <DialogTitle>Buy Now.</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <CheckoutModel
            addresses={addresses}
            caseData={caseData}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}