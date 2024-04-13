import { prisma } from "../../database/prisma";
import { TUserCreateData } from "../../schemas/user.schema";

export const create = async (data: TUserCreateData) => {
   const existingUser = await prisma.user.findFirst({ where: { email: data.email } });

   if (existingUser) {
      throw new Error("User already exist.");
   }

   const user = await prisma.user.create({ data });

   return user;
};
