import { getCaseDetails } from "@/actions/case";
import MaxWidthWrapper from "@/components/global/wrapper/MaxWidthWrapper";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import {
  casePrice,
  deliveryPricing,
  finish,
  gstPricing,
  material,
} from "@/constants/configuration";
import { useConfig } from "@/providers/config-provider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { closest } from "color-2-name";
import DeleteCase from "@/components/case/delete-case";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllShippingAddresses } from "@/actions/settings/shipping";
import CheckoutButton from "@/components/checkout/checkout-btn";

type Props = {
  params: {
    caseId: string;
  };
};

const Case = async (props: Props) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const addresses = await getAllShippingAddresses();

  const caseData = await getCaseDetails(props.params.caseId);
  if (!caseData) return null; // Handle case when caseData is not found

  const caseColor = closest(caseData.color).name;

  // Get the selected material and finish from the case data
  const selectedMaterial = caseData.material;
  const selectedFinish = caseData.finish;

  // Find the relevant material and finish prices
  const materialPrice =
    material.find((item) => item.title === selectedMaterial)?.price || 0;
  const finishPrice =
    finish.find((item) => item.title === selectedFinish)?.price || 0;

  // Calculate total price
  const basePrice = casePrice[0].price + materialPrice + finishPrice;
  const gst = (basePrice * gstPricing[0].percentage) / 100;

  const totalRawPrice = basePrice + deliveryPricing[0].price;

  const totalPrice =
    totalRawPrice + (totalRawPrice * gstPricing[0].percentage) / 100;

  return (
    <MaxWidthWrapper className="w-full h-full">
      <Card>
        <CardHeader>
          <CardTitle>Checkout your Case</CardTitle>
          <CardDescription>
            You can checkout or delete your case here.
          </CardDescription>
        </CardHeader>
        <div className="relative pt-10 pb-20 flex flex-col md:flex-row gap-16 h-full w-full items-center justify-center bg-white dark:bg-background">
          <div className="w-full flex justify-center items-center px-4">
            <div className="max-w-[240px] w-full">
              <AspectRatio ratio={170 / 347} className="bg-none rounded-[2rem]">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: caseData.color }}
                  />
                  <div className="relative h-full w-full">
                    <Image
                      src={caseData.croppedImageUrl}
                      width={caseData.width}
                      height={caseData.height}
                      alt="Your image"
                      className="pointer-events-none object-cover"
                    />
                  </div>
                  <Image
                    fill
                    alt="Phone frame"
                    src="/assets/phone-template-dark-edges.png"
                    className="pointer-events-none select-none object-contain rounded-[1.8rem]"
                  />
                </div>
              </AspectRatio>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 justify-center items-center text-lg font-semibold dark:bg-neutral-900 border-2 px-4 rounded-xl p-2">
            <div className="flex gap-3 justify-start items-center w-full dark:bg-neutral-800 bg-white p-4 rounded-xl">
              <p>Case Color :</p>
              <div
                className="h-4 w-4 rounded-full border-2 border-zinc-800 dark:border-white"
                style={{ backgroundColor: caseData.color }}
              />
              <p className="text-lg text-muted-foreground">({caseColor})</p>
            </div>
            <div className="flex gap-3 justify-start items-center w-full dark:bg-neutral-800 bg-white p-4 rounded-xl">
              <p>Material :</p>
              <p className="text-lg text-muted-foreground">
                {caseData.material}
              </p>
            </div>
            <div className="flex gap-3 justify-start items-center w-full dark:bg-neutral-800 bg-white p-4 rounded-xl">
              <p>Finish :</p>
              <p className="text-lg text-muted-foreground">{caseData.finish}</p>
            </div>
            <Separator className="h-px" />
            <div className="flex flex-col gap-3 justify-start items-center w-full dark:bg-neutral-800 bg-white p-4 rounded-xl">
              {casePrice.map((price) => (
                <div
                  className="flex justify-between items-center w-full"
                  key={price.title}
                >
                  <p>{price.title}</p>
                  <p className="text-lg">${price.price}</p>
                </div>
              ))}
              {material.find(
                (mat) => mat.title === selectedMaterial && mat.price > 0
              ) && (
                <div
                  className="flex justify-between items-center w-full"
                  key={selectedMaterial}
                >
                  <p>{selectedMaterial}</p>
                  <p className="text-lg">${materialPrice}</p>
                </div>
              )}
              {finish.find(
                (fin) => fin.title === selectedFinish && fin.price > 0
              ) && (
                <div
                  className="flex justify-between items-center w-full"
                  key={selectedFinish}
                >
                  <p>{selectedFinish}</p>
                  <p className="text-lg">${finishPrice}</p>
                </div>
              )}
              {deliveryPricing.map((delivery) => (
                <div
                  className="flex justify-between items-center w-full"
                  key={delivery.title}
                >
                  <p>{delivery.title}</p>
                  <p className="text-lg">${delivery.price}</p>
                </div>
              ))}
              {gstPricing.map((gst) => (
                <div
                  className="flex justify-between items-center w-full"
                  key={gst.title}
                >
                  <p>
                    {gst.title} ({gst.percentage}%)
                  </p>
                  <p className="text-lg">${gst.percentage.toFixed(2)}</p>
                </div>
              ))}
              <Separator className="dark:bg-white bg-zinc-300" />

              <div className="flex justify-between items-center w-full mb-2">
                <p>Total Price:</p>
                <p className="text-lg">${totalPrice.toFixed(2)}</p>
              </div>
              <CheckoutButton caseData={caseData} addresses={addresses} />

              <DeleteCase caseId={props.params.caseId} />
            </div>
          </div>
        </div>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Case;
