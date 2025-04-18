import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined
}

const createPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate())
}

export const client = globalThis.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;