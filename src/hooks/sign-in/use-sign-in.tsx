import {
  SignInProps,
  SignInSchema,
  SignUpProps,
  SignUpSchema,
} from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
  });
  const { isLoaded, signIn, setActive } = useSignIn();
  const [verifying, setVerifying] = React.useState(false);
  const [Loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const signInFormSubmit = handleSubmit(async (values) => {
    console.log("clicked submit");
    if (!isLoaded) return;
    console.log("isLoaded return passed");
    console.log("creating signIn");
    console.log("email, password : ", values.email, values.password);

    try {
      setLoading(true);
      const authenticated = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (authenticated.status === "complete") {
        setActive({ session: authenticated.createdSessionId });
        router.push("/dashboard");
      }
      console.log("signIn created");
    } catch (error) {
      console.log("error in signIn create : ", error);
    }
  });
  return {
    signInFormSubmit,
    register,
    errors,
    verifying,
    Loading,
  };
};
