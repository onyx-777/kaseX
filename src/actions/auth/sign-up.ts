"use server";

import { client } from "@/lib/prisma";
import { SignUpProps } from "@/schemas/auth.schema";
import { SignUp } from "@/types/sign-up";

export const upsertUserInDB = async (values: SignUp) => {
  try {
    const response = await client.user.upsert({
      where: {
        clerkId: values.clerkId,
      },
      create: {
        email: values.email,
        clerkId: values.clerkId,
        firstName: values.firstName,
        lastName: values.lastName,
      },

      update: {
        email: values.email,
        clerkId: values.clerkId,
        firstName: values.firstName,
        lastName: values.lastName,
      },
      select : {
        id : true
      }
    });

    return response;
  } catch (error) {
    console.log("error in createUserInDB : ", error);
  }
};

export const deleteUserInDB = async (clerkId: string) => {
  try {
    await client.user.delete({
      where: {
        clerkId,
      },
    });
  } catch (error) {
    console.log("error in deleteUserInDB : ", error);
  }
};
