import { SignUpProps, SignUpSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/forms/sign-up/provider";

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: zodResolver(SignUpSchema),
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [Loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { currentStep, setCurrentStep } = useAuthContext();

  const signUpFormSubmit = handleSubmit(async (values) => {
    console.log("clicked submit");
    if (!isLoaded) return;
    console.log("isLoaded return passed");

    // Start the sign-up process using the email and password provided
    try {
      console.log("creating signUp");
      console.log(
        "email, password, firstName, lastName : ",
        values.email,
        values.password,
        values.firstName,
        values.lastName
      );

      try {
        setLoading(true);
        await signUp.create({
          emailAddress: values.email,
          password: values.password,
        });

        setLoading(false);
        setCurrentStep((prev) => prev + 1);
        console.log("signup created");
      } catch (error) {
        console.log("error in signUp create : ", error);
      }

      console.log("going for prepare email");

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      console.log("preparing email verification");
      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  });

  // Handle the submission of the verification form

  const otpSubmit = async (otp: string) => {
    console.log("otp : ", otp);
    if (!isLoaded) return;

    try {
      setLoading(true);
      console.log("going for attempt verification");
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      //   If verification was completed, set the session to active
      //   and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };
  return {
    signUpFormSubmit,
    otpSubmit,
    register,
    errors,
    verifying,
    Loading,
  };
};
