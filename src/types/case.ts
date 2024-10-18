import { getCaseDetails } from "@/actions/case";
import { Prisma } from "@prisma/client";

export type UpsertCase = Prisma.CaseCreateWithoutUserInput

export type CaseData = Prisma.PromiseReturnType<typeof getCaseDetails>