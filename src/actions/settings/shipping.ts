"use server";
import { client } from "@/lib/prisma";
import { ShippingProps } from "@/types/shipping";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const upsertShippingAddress = async (values: ShippingProps) => {
  const user = await currentUser();
  if (!user) return;
  try {
    if (!values.id) {
      await client.shippingAddress.create({
        data: {
          ...values,
          User: {
            connect: {
              clerkId: user.id,
            },
          },
        },
      });
    } else {
      await client.shippingAddress.update({
        where: {
          id: values.id,
        },
        data: {
          ...values,
        },
      });
    }
  } catch (error) {
    console.log("error in addShippingAddress : ", error);
  }
};

export const deleteShippingAddress = async (id: string) => {
  try {
    await client.shippingAddress.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log("error in deleteShippingAddress : ", error);
  }
};

export const getAllShippingAddresses = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  try {
    const response = await client.shippingAddress.findMany({
      where: {
        User: {
          clerkId: user.id,
        },
      },
    });
    return response;
  } catch (error) {
    console.log("error in getAllShippingAddresses : ", error);
  }
};

export const setShippingAddressId = async (id: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        selectedShippingAddressId: id,
      },
    });
  } catch (error) {
    console.log('error in setShippingAddressId : ', error)
  }
};
