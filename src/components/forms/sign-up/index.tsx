"use client";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import Image from "next/image";
import React from "react";
import { useAuthContext } from "./provider";
import Registration from "./registration";
import OtpVerification from "./otp-verification";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Props = {};

const SignUpRegistration = (props: Props) => {
  const { currentStep, setCurrentStep } = useAuthContext();
  const { signUpFormSubmit, register, errors, otpSubmit, Loading } =
    useSignUpForm();

  return (
    <div className="w-full h-full">
      <div className="flex">
        <div className="w-[50%] h-screen bg-green-600 md:block hidden">
          <div className="h-full w-full flex flex-col justify-between items-center">
            <div>
              <p className="absolute top-10 left-10 text-white text-3xl font-bold">
                KaseX
              </p>
            </div>
            <div className="hidden lg:block pt-28">
              <div className="w-72 aspect-square relative">
                <Image
                  src="/assets/snake-1.png"
                  alt="kaseX sign up page"
                  fill
                />
              </div>
            </div>

            <div>
              <div className="w-full h-full px-9 pb-10">
                <p className="text-white flex justify-center items-end h-full text-base text-muted-foreground font-medium tracking-wider">
                  Welcome back! Sign up to unlock your personalized kaseX
                  experience, where you can customize your phone case to reflect
                  your unique style. Enjoy the convenience of having your
                  one-of-a-kind creation delivered right to your doorstep.
                  Let&apos;s get started!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-3 md:w-[50%] h-screen flex justify-center items-center">
          <div className="max-w-md w-full relative mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            {currentStep === 2 && (
              <ArrowLeft
                className="text-green-600 absolute -top-10 cursor-pointer"
                onClick={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Welcome to kaseX
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Sign up to kaseX to customize your phone case and have it delivered
              to your doorstep.{" "}
            </p>

            {currentStep === 1 ? (
              <Registration
                register={register}
                signUpFormSubmit={signUpFormSubmit}
                errors={errors}
                loading={Loading}
              />
            ) : (
              <OtpVerification otpSubmit={otpSubmit} loading={Loading} />
            )}

            <p className="text-zinc-600">
              Already have an account?{" "}
              <Link
                href={"/sign-in"}
                className={buttonVariants({ variant: "link" })}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpRegistration;
