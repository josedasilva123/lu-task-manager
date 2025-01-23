import { prisma } from "../../database/prisma";
import { AppError } from "../../error/AppError";

export const updatePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (user?.password !== oldPassword) {
    throw new AppError("Incorrect password.", 401);
  }

  await prisma.user.update({
    where: { id: userId },
    data: { password: newPassword },
  });

  return { message: "Password sucessfully updated." };
};
