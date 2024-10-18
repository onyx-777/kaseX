import { z } from "zod";

export const ShippingSchema = z.object({
  house: z
    .string()
    .min(1, "House name is required")
    .max(50, "House name must be less than 50 characters"),

  street: z
    .string()
    .min(1, "Street name is required")
    .max(50, "Street name must be less than 50 characters"),

  city: z
    .string()
    .min(1, "city name is required")
    .max(50, "city name must be less than 50 characters"),

  country: z
    .string()
    .min(1, "country name is required")
    .max(50, "country name must be less than 50 characters"),

  state: z
    .string()
    .min(1, "state name is required")
    .max(50, "state name must be less than 50 characters"),

  phoneNumber: z
    .string()
    .min(10, "Phone Number must be at least 10 characters"),

  postalCode: z.string().min(5, "Postal Code must be at least 5 characters"),
});
