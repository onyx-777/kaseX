"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useConfig } from "@/providers/config-provider";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Spinner } from "../spinner";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/hooks/use-uploadthing";
import { uploadCroppedImage } from "@/actions/media";
import { upsertCase } from "@/actions/case";
import { redirect } from "next/navigation";

type Props = {
  imageUrl: string;
};

export default function Component({ imageUrl }: Props) {
  const {
    imgLink,
    setImgLink,
    canvasBgColor,
    caseColor,
    caseColorOpacity,
    imageHeight,
    imageOpacity,
    imageWidth,
    setImageHeight,
    setImageOpacity,
    setImageWidth,
    setX,
    setY,
    x,
    y,
    lockAspectRatio,
    finish,
    material,
  } = useConfig();

  const { toast } = useToast();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      try {
        const createCase = await upsertCase({
          color: caseColor,
          croppedImageUrl: res[0].url,
          imageUrl: imgLink!,
          height: imageHeight,
          width: imageWidth,
          material,
          finish,
          imageOpacity: imageOpacity
        });

        return redirect(`/cases/${createCase?.id}`);
      } catch (error) {
        console.log("errror in onClientUploadComplete : ", error);
      }
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const FRAME_WIDTH = 300;
  const FRAME_HEIGHT = 612;

  useEffect(() => {
    if (imageUrl) {
      setImgLink(imageUrl);
    } else {
      setImgLink(undefined);
    }
  }, [imageUrl, setImgLink]);

  const handlePreview = async () => {
    // Preview logic here
  };

  const handleImageReset = () => {
    console.log("reset image");
    setImageWidth(116);
    setImageHeight(175);
    setX(28);
    setY(109);
  };

  const handleCreateCase = async () => {
    setLoading(true);
    if (!imgLink) {
      setLoading(false);
      toast({
        title: "Error",
        description: "No image selected",
        variant: "destructive",
      });
      return;
    }
    try {
      const base64Image = await uploadCroppedImage(
        imgLink,
        imageWidth,
        imageHeight,
        x,
        y,
        FRAME_WIDTH,
        FRAME_HEIGHT
      );

      if (!base64Image) {
        throw new Error("Failed to crop image");
      }

      // Convert base64 to blob
      const response = await fetch(base64Image);
      const blob = await response.blob();

      const file = new File([blob], "cropped-image.png", { type: "image/png" });

      const uploadResponse = await startUpload([file]);
      if (uploadResponse && uploadResponse[0] && uploadResponse[0].url) {
        console.log("Upload successful. Image URL:", uploadResponse[0].url);
        toast({
          title: "Success",
          description: "Case created successfully",
        });
      } else {
        throw new Error("Upload failed or response is invalid");
      }
    } catch (error) {
      console.error("Error creating case:", error);
      toast({
        title: "Error",
        description: "Failed to create case. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center bg-white dark:bg-zinc-900"
      // style={{ backgroundColor: canvasBgColor }}
    >
      <div className="w-full max-w-[300px] px-4">
        <AspectRatio ratio={170 / 347} className="bg-none rounded-[2rem]">
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
            {/* Case color background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: caseColor,
                opacity: caseColorOpacity / 100,
              }}
            />

            {/* Image layer */}
            {(imageUrl || imgLink) && (
              <Rnd
                size={{ width: imageWidth, height: imageHeight }}
                position={{ x: x, y: y }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setImageWidth(parseInt(ref.style.width));
                  setImageHeight(parseInt(ref.style.height));
                  setX(position.x);
                  setY(position.y);
                  console.log(parseInt(ref.style.width));
                  console.log(parseInt(ref.style.height));
                  console.log(position.x);
                  console.log(position.y);
                }}
                onDragStop={(e, data) => {
                  setX(data.x);
                  setY(data.y);
                }}
                // bounds="parent"
                lockAspectRatio={lockAspectRatio}
                resizeHandleComponent={{
                  bottomRight: (
                    <div className="h-2 w-2 absolute bottom-0 right-0 rounded-full bg-white" />
                  ),
                  bottomLeft: (
                    <div className="h-2 w-2 absolute bottom-0 left-0 rounded-full bg-white" />
                  ),
                  topRight: (
                    <div className="h-2 w-2 absolute top-0 right-0 rounded-full bg-white" />
                  ),
                  topLeft: (
                    <div className="h-2 w-2 absolute top-0 left-0 rounded-full bg-white" />
                  ),
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={imgLink ? imgLink : imageUrl}
                    fill
                    alt="Your image"
                    style={{ opacity: imageOpacity ? imageOpacity / 100 : 1 }}
                    className="pointer-events-none object-cover"
                  />
                </div>
              </Rnd>
            )}

            {/* Phone frame on top */}
            <Image
              fill
              alt="Phone frame"
              src="/assets/phone-template-dark-edges.png"
              className="pointer-events-none select-none object-contain rounded-[1.8rem]"
            />
          </div>
        </AspectRatio>
      </div>
      <div className="flex bg-white dark:bg-background md:flex-row flex-col justify-between gap-2 item-center w-full absolute left-0 right-0 bottom-0">
        <Button
          onClick={handleImageReset}
          variant="outline"
          className="w-full dark:bg-zinc-900 bg-white text-black dark:text-white text-lg font-semibold"
        >
          Reset Image
        </Button>
        <Button
          onClick={handleCreateCase}
          variant={"outline"}
          className="w-full dark:bg-white dark:text-black bg-black text-white text-lg font-semibold"
        >
          {loading ? <Spinner /> : "Create Case"}
        </Button>
      </div>
    </div>
  );
}
