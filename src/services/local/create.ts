import { prisma } from "../../database/prisma";
import { TLocalBody } from "../../schemas/local.schema";

export const create = async (data: TLocalBody) => {
    const local = await prisma.local.create({ data });

    return local;
}