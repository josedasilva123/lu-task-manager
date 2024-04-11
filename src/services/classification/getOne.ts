import { prisma } from "../../database/prisma";

export const getOne = async (id: string) => {
    const classification = await prisma.classification.findFirst({ where: { id }});

    return classification;
}