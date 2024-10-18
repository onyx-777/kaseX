"use client"

import React, {
  createContext,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<SetStateAction<number>>;
}

const initialValues: Props = {
  currentStep: 1,
  setCurrentStep: () => 1,
};

export const AuthContext = createContext(initialValues);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const values: Props = {
    currentStep,
    setCurrentStep,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext)
  if (!AuthContext) {
    throw "Auth Context should be used in Auth Provider";
  }

  return context;
};
