import { prisma } from "../../database/prisma";
import { TStatusBody } from "../../schemas/status.schema";

export const create = async (data: TStatusBody) => {
    const status = await prisma.status.create({ data });

    return status;
}