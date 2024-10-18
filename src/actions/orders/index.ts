"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const createOrderInDB = async (
  paymentIntent: string,
  amount: number,
  caseId: string,
  userId: string
) => {
  console.log("inside createOrder");
  console.log("user checked going for db find user");

  console.log({
    paymentIntent,
    amount,
    caseId,
    userId,
  });

  try {
    const userData = await client.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        selectedShippingAddressId: true,
        id : true,
      },
    });

    console.log('userData id : ', userData)

    if (!userData?.selectedShippingAddressId) return;

    console.log("going for order create in db");

    await client.order.create({
      data: {
        amount,
        paymentIntent,
        caseId,
        userId : userData.id,
        shippingAddressId: userData?.selectedShippingAddressId,
        isPaid: true,
      },
    });

    console.log("order created in db");
  } catch (error) {
    console.log("error in createOrder in order action : ", error);
  }
};

export const getUserOrders = async()=>{
  const user = await currentUser();
  if(!user) return;

  try {
    const response = await client.order.findMany({
      where : {
        user : {
          clerkId : user.id
        }
      },
      select : {
        amount: true,
        caseId: true,
        createdAt: true,
        paymentIntent : true,
        case : {
          select : {
            croppedImageUrl : true
          }
        }
      }
    })

    return response;
  } catch (error) {
    console.log('error in getUserDetails : ', error)
  }
}