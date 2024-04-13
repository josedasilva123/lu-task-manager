import { app } from "../../app";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/AppError";
import { TUserLoginData, userReturnSchema } from "../../schemas/user.schema";

export const login = async (data: TUserLoginData) => {
   const user = await prisma.user.findFirst({ where: { email: data.email } });

   if (!user || user.password !== data.password) {
      throw new AppError("User and password does not match.");
   }

   const token = app.jwt.sign({ id: user.id });

   return {
      user: userReturnSchema.parse(user),
      accessToken: token,
   };
};
