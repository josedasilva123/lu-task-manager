import { prisma } from "../../database/prisma";
import { IFilters } from "../../interfaces/filter.interface";
import { IPagination } from "../../interfaces/pagination.interface";

export const getMany = async (
   filters: IFilters,
   { skip, take }: IPagination = { skip: 0, take: 20 }
) => {
   const count = await prisma.task.count({ where: { isDeleted: false } });

   const tasks = await prisma.task.findMany({
      where: {
         categories: filters.categoryId
            ? { some: { id: filters.categoryId } }
            : undefined,
         statusId: filters.statusId,
         date: filters.date ? { lte: new Date(filters.date) } : undefined,
         OR: filters.search
            ? [
                 { title: { contains: filters.search } },
                 { description: { contains: filters.search } },
              ]
            : undefined,
         isDeleted: false,
      },
      skip,
      take,
      orderBy: { createdAt: "desc" },
   });

   return { count, tasks };
};
