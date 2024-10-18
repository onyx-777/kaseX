"use client";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useConfig } from "@/providers/config-provider";
import React, { useState } from "react";

type Props = {};

const RangeSlider = (props: Props) => {
  const { setImageOpacity, imageOpacity } = useConfig();
  const handleOnValueChange = (value: number) => {
    setImageOpacity(value);
  };
  return (
    <div>
      <Slider
        defaultValue={[imageOpacity]}
        max={100}
        min={1}
        step={1}
        className="w-full h-1.5"
        onValueChange={(val) => handleOnValueChange(val[0])}
      />
    </div>
  );
};

export default RangeSlider;
