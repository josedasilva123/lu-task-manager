import { prisma } from "../../database/prisma"

export const getOne = async (id: string) => {
    const category = await prisma.category.findFirst({ where: { id }});

    return category;
}