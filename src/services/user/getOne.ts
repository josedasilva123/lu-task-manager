import { prisma } from "../../database/prisma"

export const getOne = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id }});

    return user;
}