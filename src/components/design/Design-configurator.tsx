"use client";

import React, { useState } from "react";
import { useConfig } from "@/providers/config-provider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorCanvasPalette from "./configurators/color-palette";
import { ImageUrl } from "./configurators/image-url";
import RangeSlider from "./configurators/progress-bar";
import CaseMaterial from "./configurators/radio-group";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useUploadThing } from "@/hooks/use-uploadthing";
import { uploadCroppedImage } from "@/actions/media";
import { Spinner } from "../spinner";
import { useToast } from "@/hooks/use-toast";

export default function DesignConfigurator() {
  const {
    caseColor,
    imageOpacity,
    lockAspectRatio,
    seTLockAspectRatio,
    imgLink,
    imageWidth,
    imageHeight,
    x,
    y,
  } = useConfig();

  return (
    <div className="w-full h-screen flex flex-col dark:text-white text-black md:-mt-16 pb-20 md:pb-10 md:pt-14 font-semibold">
      <div className="flex-shrink-0 flex flex-col justify-center items-center gap-3 p-5 w-full">
        <p className="font-bold text-center text-xl w-full bg-white dark:bg-black dark:text-white text-black rounded-xl py-2 ">
          Customize Your Case
        </p>
        <Separator className="w-full h-px" />
      </div>
      <ScrollArea className="w-full border-2 border-zinc-300 dark:border-none">
        <div className="md:p-10 pt-7 p-5 -mt-4 h-full flex flex-col justify-center items-center gap-10">
          <div className="w-full">
            <ImageUrl />
          </div>
          <div className="w-full bg-zinc-100 dark:bg-neutral-900 p-2 rounded-xl">
            <p className="w-full text-center text-lg py-2 rounded-full mb-5 bg-white dark:bg-neutral-800">
              Case Settings
            </p>
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex flex-col gap-3 justify-center items-center w-full">
                <div className="w-full flex-1">
                  <ColorCanvasPalette type="caseColor" />
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col justify-center items-center gap-5 dark:bg-neutral-950 bg-white dark:text-white p-5 rounded-xl">
              <div className="flex flex-col gap-5 justify-center items-center w-full">
                <div className="w-full">
                  <div className="flex justify-center items-center gap-2 text-lg">
                    Material
                  </div>
                </div>
                <div className="w-full flex-1">
                  <CaseMaterial type="material" />
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-5 justify-center items-center w-full">
                <div className="w-full">
                  <div className="flex justify-center items-center gap-2 text-lg">
                    Finish
                  </div>
                </div>
                <div className="w-full flex-1">
                  <CaseMaterial type="finish" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-neutral-900 p-2 rounded-xl">
            <p className="w-full text-center text-lg py-2 rounded-full mb-5 bg-white dark:bg-neutral-800">
              Image Settings
            </p>
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex flex-col justify-center items-center gap-10 w-full h-full dark:bg-neutral-950 dark:text-white p-5 rounded-xl">
                <div className="flex flex-col justify-center gap-10 items-center w-full">
                  <div className="flex flex-col flex-1 gap-3 p-4 justify-center items-center w-full dark:bg-neutral-800 bg-white rounded-xl">
                    <div className="w-full">
                      <div className="flex justify-between items-center gap-2">
                        Image Opacity
                        <p className="font-semibold">{imageOpacity} %</p>
                      </div>
                    </div>
                    <div className="w-full flex-1">
                      <RangeSlider />
                    </div>
                  </div>
                  <div className="flex justify-between p-4 items-center w-full dark:bg-neutral-800 bg-white rounded-xl">
                    <p>Lock Aspect Ratio</p>
                    <Switch
                      className="border-2"
                      checked={lockAspectRatio}
                      onCheckedChange={(checked: boolean) =>
                        seTLockAspectRatio(checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </ScrollArea>
    </div>
  );
}