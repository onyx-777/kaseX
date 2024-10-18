"use client";
import MaxWidthWrapper from "@/components/global/wrapper/MaxWidthWrapper";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import React, { FormEvent, useState } from "react";

type Props = {
  otpSubmit: (otp: string) => void;
  loading: boolean
};

const OtpVerification = ({ otpSubmit,loading }: Props) => {
  const [otp, setOtp] = useState<string | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (otp && otp.toString().length === 6) {
      otpSubmit(otp);
    } else {
      console.log("OTP must be 6 digits.");
    }
  };

  return (
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4 w-full">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            onChange={(val) => setOtp(val)}
            className="w-full flex justify-center items-center"
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="border-2 border-zinc-400 xs:mx-2"
              />
              <InputOTPSlot
                index={1}
                className="border-2 border-zinc-400 xs:mx-2"
              />
              <InputOTPSlot
                index={2}
                className="border-2 border-zinc-400 xs:mx-2"
              />
              <InputOTPSlot
                index={3}
                className="border-2 border-zinc-400 xs:mx-2"
              />
              <InputOTPSlot
                index={4}
                className="border-2 border-zinc-400 xs:mx-2"
              />
              <InputOTPSlot
                index={5}
                className="border-2 border-zinc-400 xs:mx-2"
              />
            </InputOTPGroup>
          </InputOTP>
          <Button className="w-full mt-4" type="submit" disabled={loading}>
            {loading ? <Spinner /> : <>Verify OTP &rarr;</>}
          </Button>
        </div>
      </form>
  );
};

export default OtpVerification;
