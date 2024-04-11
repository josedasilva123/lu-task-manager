import { prisma } from "../../database/prisma"

export const getMany = async (taskId: string) => {
    const files = await prisma.file.findMany({ where: { taskId }});

    return files;
}