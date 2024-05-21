import { prisma } from "../../database/prisma";
import { IFilters } from "../../interfaces/filter.interface";
import { IPagination } from "../../interfaces/pagination.interface";

export const getMany = async (
   filters: IFilters,
   { skip, take }: IPagination = { skip: 0, take: 20 }
) => {
   const where = {
      categories: filters.categoryId ? { some: { id: filters.categoryId } } : undefined,
      statusId: filters.statusId,
      localId: filters.localId,
      date:
         filters.minDate || filters.maxDate
            ? {
                 gte: filters.minDate ? new Date(filters.minDate) : undefined,
                 lte: filters.maxDate ? new Date(filters.maxDate) : undefined,
              }
            : undefined,
      OR: filters.search
         ? [
              { title: { contains: filters.search } },
              { description: { contains: filters.search } },
           ]
         : undefined,
      isDeleted: false,
   };

   const count = await prisma.task.count({ where });

   const tasks = await prisma.task.findMany({
      where,
      include: {
         local: true,
         classification: true,
         status: true,
         categories: true,
         links: true,
         files: true,
         user: {
            select: { id: true, name: true, email: true },
         },
      },
      skip,
      take,
      orderBy: { createdAt: "desc" },
   });

   return { count, tasks };
};
