"use client";

import * as React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";

export const useOauthSignIn = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return {
    signInWith,
    isLoaded
  };
};
