import { prisma } from "../../database/prisma"

export const getMany = async () => {
    const locals = await prisma.local.findMany({ orderBy: { createdAt: "desc"}});

    return locals;
}