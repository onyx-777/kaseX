"use server";

import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getUserDetails = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  try {
    const response = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        id: true,
        clerkId : true,
        selectedShippingAddressId:true,
      },
    });

    return response;
  } catch (error) {
    console.log("error in getUserDetails : ", error);
  }
};

export async function updateUser(userId: string, data: { firstName?: string, lastName?: string }) {
  console.log('data in updateUser : ', data)
  try {
    const updatedUser = await clerkClient().users.updateUser(userId, data)
    console.log('data in updateUser : ', data)
    return { success: true }
  } catch (error) {
    console.error('Error updating user:', error)
    return { success: false, error: 'Failed to update user' }
  }
}