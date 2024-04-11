import { prisma } from "../../database/prisma"

export const getMany = async () => {
    const classifications = await prisma.classification.findMany();

    return classifications;
}