import { prisma } from "../../database/prisma"

export const getOne = async (id: string) => {
    const category = await prisma.category.findUnique({ where: { id }});

    return category;
}