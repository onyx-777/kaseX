import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createOrderInDB } from "@/actions/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req: NextRequest) {
  let stripeEvent: Stripe.Event;
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;
  try {
    if (!sig || !webhookSecret) {
      console.log(
        "🔴 Error Stripe webhook secret or the signature does not exist."
      );
      return;
    }
    stripeEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error: any) {
    console.log(`🔴 Error ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (stripeEvent.type) {
      case "payment_intent.succeeded":
        console.log("PAYMENT INTENT SUCCEEDED 💳", stripeEvent.data);
        const data = stripeEvent.data.object;
        console.log("going for createOrder in db");
        await createOrderInDB(data.id, data.amount / 100, data.metadata.caseId, data.metadata.userId);
        console.log('saved order in DB')
      default:
        console.log("👉🏻 Unhandled relevant event!", stripeEvent.type);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("🔴 Webhook Error", { status: 400 });
  }
  return NextResponse.json(
    {
      webhookActionReceived: true,
    },
    {
      status: 200,
    }
  );
}
