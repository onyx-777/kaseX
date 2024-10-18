import { getUserDetails } from "@/actions/user";
import { Prisma } from "@prisma/client";

export type UserData = Prisma.PromiseReturnType<typeof getUserDetails>