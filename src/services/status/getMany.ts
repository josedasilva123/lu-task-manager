import { prisma } from "../../database/prisma"

export const getMany = async () => {
    const statusList = await prisma.status.findMany({ orderBy: { name: "asc" }});

    return statusList;
}