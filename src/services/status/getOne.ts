import { prisma } from "../../database/prisma";

export const getOne = async (id: string) => {
    const status = await prisma.status.findFirst({ where: { id }});

    return status;
}