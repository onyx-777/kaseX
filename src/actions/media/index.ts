"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { ClientUploadedFileData } from "uploadthing/types";

export const createMedia = async (url: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    await client.media.create({
      data: {
        url,
        user: {
          connect: {
            clerkId: user.id,
          },
        },
      },
    });
  } catch (error) {
    console.log("error in createMedia : ", error);
  }
};

export const getMedia = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  try {
    const response = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        Media: {
          select: {
            url: true,
            id: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return response;
  } catch (error) {
    console.log("error in fetching user media : ", error);
  }
};

export const deleteMedia = async (id: string) => {
  try {
    await client.media.delete({
      where: {
        id,
      },
    });
    return;
  } catch (error) {
    console.log("error deleteing media in actions/media : ", error);
  }
};

export const uploadCroppedImage = async (
  imgLink: string,
  imageWidth: number,
  imageHeight: number,
  x: number,
  y: number,
  frameWidth: number,
  frameHeight: number
): Promise<string | null> => {
  try {
    const response = await fetch(imgLink);
    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Get the dimensions of the original image
    const { width: originalWidth, height: originalHeight } = await sharp(imageBuffer).metadata();

    if (!originalWidth || !originalHeight) {
      throw new Error("Unable to determine original image dimensions");
    }

    // Calculate scaling factors
    const scaleX = originalWidth / imageWidth;
    const scaleY = originalHeight / imageHeight;

    // Calculate the visible area within the frame
    const visibleLeft = Math.max(0, -x);
    const visibleTop = Math.max(0, -y);
    const visibleWidth = Math.min(frameWidth, imageWidth - visibleLeft);
    const visibleHeight = Math.min(frameHeight, imageHeight - visibleTop);

    // Calculate the crop area in original image coordinates
    const left = Math.round(visibleLeft * scaleX);
    const top = Math.round(visibleTop * scaleY);
    const width = Math.round(visibleWidth * scaleX);
    const height = Math.round(visibleHeight * scaleY);

    console.log("Crop parameters:", { left, top, width, height, originalWidth, originalHeight });

    // Ensure all values are positive and within the original image bounds
    if (left < 0 || top < 0 || width <= 0 || height <= 0 || 
        left + width > originalWidth || top + height > originalHeight) {
      throw new Error("Invalid crop parameters");
    }

    const croppedImageBuffer = await sharp(imageBuffer)
      .extract({ width, height, left, top })
      .resize(frameWidth, frameHeight, { fit: 'cover' })
      .png()
      .toBuffer();

    console.log('Cropped image buffer length:', croppedImageBuffer.length);

    // Convert buffer to base64
    const base64Image = croppedImageBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error("Error in uploadCroppedImage:", error);
    return null;
  }
};