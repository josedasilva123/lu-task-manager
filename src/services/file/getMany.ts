import { prisma } from "../../database/prisma"

export const getMany = async () => {
    const files = await prisma.file.findMany();

    return files;
}