import { getMedia } from "@/actions/media";
import { Prisma } from "@prisma/client";

export type GetUserMedia = Prisma.PromiseReturnType<typeof getMedia>;
