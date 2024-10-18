import { z } from "zod";

export type SignUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),

  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

export type SignInProps = {
  email: string;
  password: string;
};

export const SignInSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});
