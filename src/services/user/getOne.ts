import { prisma } from "../../database/prisma"
import { userReturnSchema } from "../../schemas/user.schema";

export const getOne = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id }});

    return userReturnSchema.parse(user);
}