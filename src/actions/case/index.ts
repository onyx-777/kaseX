"use server";

import { client } from "@/lib/prisma";
import { UpsertCase } from "@/types/case";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const upsertCase = async (values: UpsertCase) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  try {
    if (values.id) {
      const response = await client.case.update({
        where: {
          id: values.id,
        },
        data: {
          ...values,
        },
        select: {
          id: true,
        },
      });
      return response;
    } else {
      const response = await client.case.create({
        data: {
          ...values,
          user: {
            connect: {
              clerkId: user.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      return response;
    }
  } catch (error) {
    console.error("Error in case action index.ts: ", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export const getCaseDetails = async (id: string) => {
  try {
    const data = await client.case.findUnique({
      where: {
        id,
      },
      select: {
        color: true,
        imageUrl: true,
        croppedImageUrl: true,
        finish: true,
        height: true,
        material: true,
        width: true,
        imageOpacity: true,
        id: true
      },
    });

    return data;
  } catch (error) {
    console.log("error in getClientDetails : ", error);
  }
};

export const getAllCases = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  try {
    const response = await client.case.findMany({
      where: {
        user: {
          clerkId: user.id,
        },
      },
      select: {
        croppedImageUrl: true,
        createdAt: true,
        id: true,
      },
    });
    return response;
  } catch (error) {
    console.log("error in getAllCases : ", error);
  }
};

export const deleteCase = async (id: string) => {
  try {
    await client.case.delete({
      where : {
        id,
      }
    })
  } catch (error) {
    console.log('error in deleteCase : ', error)
  }
};
