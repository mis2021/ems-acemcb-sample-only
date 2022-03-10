import { prisma } from "../../../lib/prisma"

export const userResolverQr = async () => await prisma.user.findMany()
