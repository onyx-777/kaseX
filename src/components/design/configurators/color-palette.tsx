"use client";

import React from "react";
import { useConfig } from "@/providers/config-provider";
import { ColorPicker, useColor, IColor } from "react-color-palette";
import "react-color-palette/css";

type Props = {
  type: "canvasColor" | "caseColor";
};

const ColorPalette = ({ type }: Props) => {
  const { setCanvasBgColor, setCaseColor } = useConfig();
  const [color, setColor] = useColor(type === "canvasColor" ? "#000000" : "#00011e");

  // Update context when color changes
  const handleColorChange = (newColor: IColor) => {
    if (type === "canvasColor") {
      setCanvasBgColor(newColor.hex);
    } else {
      setCaseColor(newColor.hex);
    }
    setColor(newColor);
  };

  return (
    <div>
      <ColorPicker
        color={color}
        onChange={handleColorChange}
        hideInput
      />
    </div>
  );
};

export default ColorPalette;