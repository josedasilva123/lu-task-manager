import { prisma } from "../../database/prisma"

export const getMany = async () => {
    const statusList = await prisma.status.findMany({ orderBy: { createdAt: "desc"}});

    return statusList;
}