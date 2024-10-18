'use client'

import React from "react"
import Image from "next/image"
import { closest } from "color-2-name"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AddressRadioGroup } from "@/components/settings/shipping/address-radio"
import CheckoutProvider from "@/components/checkout/client-checkout-provider/provider"
import { CaseData } from "@/types/case"
import { GetShippingAddresses } from "@/types/shipping"
import { casePrice, material, finish, deliveryPricing, gstPricing } from "@/constants/configuration"

type Props = {
  caseData: CaseData
  addresses: GetShippingAddresses
}

export default function CheckoutModel({ caseData, addresses }: Props) {
  if (!caseData) return null

  const caseColor = closest(caseData.color).name
  const selectedMaterial = caseData.material
  const selectedFinish = caseData.finish

  const materialPrice = material.find((item) => item.title === selectedMaterial)?.price || 0
  const finishPrice = finish.find((item) => item.title === selectedFinish)?.price || 0

  const basePrice = casePrice[0].price + materialPrice + finishPrice
  const gst = (basePrice * gstPricing[0].percentage) / 100
  const totalRawPrice = basePrice + deliveryPricing[0].price
  const totalPrice = totalRawPrice + (totalRawPrice * gstPricing[0].percentage) / 100

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Checkout your Case</CardTitle>
        <CardDescription>Review your case details and proceed to payment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row justify-center items-start w-full gap-6">
          <div className="w-full md:w-1/2 flex justify-center items-start">
            <div className="w-full max-w-[200px] sm:max-w-[240px]">
              <AspectRatio ratio={170 / 347} className="bg-none rounded-[2rem]">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                  <div className="absolute inset-0" style={{ backgroundColor: caseData.color }} />
                  <Image
                    src={caseData.croppedImageUrl}
                    alt="Your case design"
                    fill
                    className="pointer-events-none object-cover"
                  />
                  <Image
                    src="/assets/phone-template-dark-edges.png"
                    alt="Phone frame"
                    fill
                    className="pointer-events-none select-none object-contain rounded-[1.8rem]"
                  />
                </div>
              </AspectRatio>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center w-full md:w-1/2 gap-6">
            <div className="w-full space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  Your {caseColor} colored case with {caseData.material} material and {caseData.finish} finish is ready to be shipped.
                </p>
              </div>
              <div className="space-y-2">
                {[
                  ...casePrice,
                  ...(materialPrice > 0 ? [{ title: selectedMaterial, price: materialPrice }] : []),
                  ...(finishPrice > 0 ? [{ title: selectedFinish, price: finishPrice }] : []),
                  ...deliveryPricing,
                  { title: `GST (${gstPricing[0].percentage}%)`, price: gst },
                ].map((item) => (
                  <div key={item.title} className="flex justify-between items-center text-sm">
                    <span>{item.title}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Price:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="w-full space-y-4">
              <h2 className="text-lg font-semibold">Select Shipping Address</h2>
              <AddressRadioGroup addresses={addresses} />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Payment</h2>
          <div className="h-[400px]">
            <CheckoutProvider amount={totalPrice} caseId={caseData.id} />
          </div>
        </div>
        <div className=""></div>
      </CardContent>
    </Card>
  )
}