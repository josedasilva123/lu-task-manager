import { prisma } from "../../database/prisma";
import { TLinkBody } from "../../schemas/link.schema";

export const createMany = async (taskId: string, data: TLinkBody[]) => {
    const linkCreateData = data.map(link => ({ ...link, taskId }));

    await prisma.link.createMany({ data: linkCreateData });
}