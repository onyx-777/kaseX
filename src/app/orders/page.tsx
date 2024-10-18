"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import Confetti, { ConfettiRef } from "@/components/ui/confetti";

type Props = {
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: string;
  };
};

export default function PaymentConfirmationPage({ searchParams }: Props) {
  const paymentIntent = searchParams.payment_intent;
  const redirectStatus = searchParams.redirect_status;

  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="fixed inset-0 flex justify-center items-center w-full h-full">
      <div className="relative flex gap-10 h-screen w-fit flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Order Placed
        </span>
        <Button
          variant={"link"}
          className="text-muted-foreground text-lg font-medium z-50"
        >
          <Link href={"/cases"}>Continue Shopping</Link>
        </Button>

        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      </div>
    </div>
  );
}
