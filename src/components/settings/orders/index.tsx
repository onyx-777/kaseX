import { getUserOrders } from "@/actions/orders";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Orders = async (props: Props) => {
  const orderData = await getUserOrders();
  if (!orderData) return;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Information</CardTitle>
        <CardDescription>Review your orders here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-5 justify-center items-center w-full flex-wrap mb-20">
          {orderData.map(({ amount, caseId, createdAt, paymentIntent, case : {croppedImageUrl} }) => (
            <Card
              className="max-w-sm mx-auto shadow-md rounded-lg min-h-72"
              key={caseId}
            >
              <CardHeader className="p-4">
                <h2 className="text-lg font-bold flex justify-start items-center w-full gap-3">
                  {paymentIntent}
                </h2>
                <h3 className="text-sm text-muted-foreground">{createdAt.toDateString()}</h3>
              </CardHeader>
              <CardContent className="p-4 w-full flex justify-center items-center bg-background relative">
                <Image src={croppedImageUrl} alt="case order" width={90} height={90} className="rounded-lg" />
                <Image src={'/assets/phone-template-dark-edges.png'} alt="case order" width={90} height={90} className="rounded-lg absolute"  />
              </CardContent>
              <CardFooter className="p-4">
                ${amount}
                <Link
                  href={`/cases/${caseId}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  Review Case
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Orders;
