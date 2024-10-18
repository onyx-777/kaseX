import Stripe from "stripe";
export const serveStripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-09-30.acacia",
  typescript : true,
});
