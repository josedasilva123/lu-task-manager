import { prisma } from "../../database/prisma";

export const softRemove = async (id: string) => {
   await prisma.task.update({ where: { id }, data: { isDeleted: true } });
};
