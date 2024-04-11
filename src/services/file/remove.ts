import { prisma } from "../../database/prisma"

export const remove = async (id: string) => {
    await prisma.file.delete({ where: { id }});
}