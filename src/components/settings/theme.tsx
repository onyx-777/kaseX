"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SystemMode } from "../themes-placeholder/systemmode";
import { LightMode } from "../themes-placeholder/lightmode";
import { DarkMode } from "../themes-placeholder/darkmode";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";
import { Label } from "../ui/label";
import { useThemeMode } from "@/hooks/use-theme";

type Props = {};

const Theme = (props: Props) => {
  const { setTheme, theme } = useThemeMode();

  return (
    <>
      <Separator />
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="lg:col-span-4 flex lg:flex-row flex-col justify-center items-start gap-5 flex-wrap">
          <div
            className={cn(
              "rounded-2xl overflow-hidden p-3 cursor-pointer border-4 border-transparent",
              theme == "system" && "border-primary"
            )}
            onClick={() => setTheme("system")}
          >
            <SystemMode />
            <Label className="text-lg font-semibold">System</Label>
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden p-3 cursor-pointer border-4 border-transparent",
              theme == "light" && "border-primary"
            )}
            onClick={() => setTheme("light")}
          >
            <LightMode />
            <Label className="text-lg font-semibold">Light</Label>
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden p-3 cursor-pointer border-4 border-transparent",
              theme == "dark" && "border-primary"
            )}
            onClick={() => setTheme("dark")}
          >
            <DarkMode />
            <Label className="text-lg font-semibold">Dark</Label>
          </div>
        </div>
      </div>
      <Separator />

    </>
  );
};

export default Theme;
