import { prisma } from "../../database/prisma";
import { IFilters } from "../../interfaces/filter.interface";
import { IPagination } from "../../interfaces/pagination.interface";

export const getMany = async (
   filters: IFilters,
   { skip, take }: IPagination = { skip: 0, take: 20 }
) => {
   const tasks = await prisma.task.findMany({
      where: {
         categories: { some: { id: filters.categoryId } },
         statusId: filters.statusId,
         OR: [
            { title: { contains: filters.search } },
            { description: { contains: filters.search } },
         ],
         date: { lte: filters.date ? new Date(filters.date) : undefined },
         isDeleted: false,
      },
      skip,
      take,
      orderBy: { createdAt: "desc"}
   });

   return tasks;
};
