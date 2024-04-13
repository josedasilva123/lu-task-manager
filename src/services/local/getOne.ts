import { prisma } from "../../database/prisma";

export const getOne = async (id: string) => {
    const local = await prisma.local.findUnique({ where: { id }});

    return local;
}