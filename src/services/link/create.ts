import { prisma } from "../../database/prisma";
import { TLinkBody } from "../../schemas/link.schema";

export const create = async (taskId: string, data: TLinkBody) => {
    const linkData = { ...data, taskId };

    const link = await prisma.link.create({ data: linkData });

    return link;
} 