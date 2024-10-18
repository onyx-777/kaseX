import { getAllShippingAddresses } from "@/actions/settings/shipping";
import { Prisma } from "@prisma/client";

export type ShippingProps = Prisma.ShippingAddressCreateWithoutUserInput

export type GetShippingAddresses = Prisma.PromiseReturnType<typeof getAllShippingAddresses>