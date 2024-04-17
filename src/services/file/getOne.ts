import { prisma } from "../../database/prisma"

export const getOne = async (id: string) => {
    const file = await prisma.file.findUnique({ where: { id }});

    return file;
}