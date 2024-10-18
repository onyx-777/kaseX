import React, { FormEventHandler } from "react";
import FormGenerator from "../form-generator";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { Button } from "@/components/ui/button";
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { SignInProps, SignUpProps } from "@/schemas/auth.schema";
import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useOauthSignIn } from "@/hooks/oauth/OauthSignIn";

type Props = {
  register: UseFormRegister<SignInProps>;
  errors?: FieldErrors<FieldValues>;
  signInFormSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
};

const SignInForm = ({ register, errors, signInFormSubmit, loading }: Props) => {
  const { signInWith, isLoaded } = useOauthSignIn() || {};

  const handleGoogleSignIn = () => {
    if (signInWith) {
      signInWith('oauth_google');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 my-8 w-full">
      <form onSubmit={signInFormSubmit} className="w-full">
        <div className="flex flex-col mb-4 w-full gap-7">
          <FormGenerator
            inputType="input"
            label="Email"
            name="email"
            placeholder="project@fc.com"
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
        <Button
          className="w-full mt-4 "
          type="submit"
          disabled={loading}
        >
          {loading ? <Spinner /> : <>Sign In &rarr;</>}
        </Button>
      </form>
      <Separator />
      <Button
        className="flex justify-center items-center w-full gap-2 bg-white text-black"
        onClick={handleGoogleSignIn}
        disabled={!isLoaded}
      >
        <span>
          <Image
            src={"/assets/google-icon.png"}
            alt="sign in google"
            width={20}
            height={20}
          />
        </span>
        <span className="text-sm font-medium">Sign In With Google</span>
      </Button>
    </div>
  );
};

export default SignInForm;
