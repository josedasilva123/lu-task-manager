import { prisma } from "../../database/prisma"

export const getMany = async (taskId: string) => {
    const links = await prisma.link.findMany({ where: { taskId }});

    return links;
}