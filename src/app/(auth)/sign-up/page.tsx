import FormGenerator from "@/components/forms/form-generator";
import SignUpRegistration from "@/components/forms/sign-up";
import {
  AuthContextProvider,
  useAuthContext,
} from "@/components/forms/sign-up/provider";
import Registration from "@/components/forms/sign-up/registration";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import Image from "next/image";
import React from "react";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <AuthContextProvider>
      <SignUpRegistration />
    </AuthContextProvider>
  );
};
export default SignIn;
