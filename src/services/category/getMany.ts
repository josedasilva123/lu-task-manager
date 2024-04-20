import { prisma } from "../../database/prisma"

export const getMany = async () => {
    const categories = await prisma.category.findMany({ orderBy: { createdAt: "desc"}});

    return categories;
}