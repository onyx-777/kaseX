"use client";

import React from "react";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { SignUpProps } from "@/schemas/auth.schema";
import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useOauthSignIn } from "@/hooks/oauth/OauthSignIn";
import Image from "next/image";

type Props = {
  register: UseFormRegister<SignUpProps>;
  errors?: FieldErrors<FieldValues>;
  signUpFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
};

const Registration = ({
  register,
  errors,
  signUpFormSubmit,
  loading,
}: Props) => {
  const handleGoogleSignIn = () => {
    const { signInWith } = useOauthSignIn() || {};

    if (signInWith) {
      signInWith('oauth_google');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 my-8">
      <form onSubmit={signUpFormSubmit} className="w-full gap-2">
        <div className="flex flex-col sm:flex-row sm:space-x-2 md:flex-row md:space-x-2 mb-4 w-full">
          <FormGenerator
            inputType="input"
            label="First Name"
            name="firstName"
            placeholder="Tyler"
            register={register}
            errors={errors}
            type="text"
          />
          <FormGenerator
            inputType="input"
            label="Last Name"
            name="lastName"
            placeholder="Durden"
            register={register}
            errors={errors}
            type="text"
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <FormGenerator
            inputType="input"
            label="Email"
            name="email"
            placeholder="projectmayhem@fc.com"
            register={register}
            errors={errors}
            type="email"
          />
          <FormGenerator
            inputType="input"
            label="Password"
            name="password"
            placeholder="••••••••"
            register={register}
            errors={errors}
            type="password"
          />
        </div>
        <Button className="w-full mt-4" type="submit" disabled={loading}>
          {loading ? <Spinner /> : <>Sign Up &rarr;</>}
        </Button>
      </form>
      <Separator />
      <Button
        className="flex justify-center items-center w-full gap-2 bg-white hover:text-white"
        onClick={handleGoogleSignIn}
        // disabled={!oauthSignIn}
      >
        <span>
          <Image
            src={"/assets/google-icon.png"}
            alt="sign in with google kaseX"
            width={20}
            height={20}
          />
        </span>
        <span>Sign In With Google</span>
      </Button>
    </div>
  );
};

export default Registration;
