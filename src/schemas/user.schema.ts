import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type TUser = z.infer<typeof userSchema>;

export const userCreateSchema = userSchema.omit({ id: true });

export type TUserCreateData = z.infer<typeof userCreateSchema>;

export const userLoginSchema = userSchema.pick({ email: true, password: true });

export type TUserLoginData = z.infer<typeof userLoginSchema>;

export const userReturnSchema = userSchema.omit({ id: true });

export type TUserReturn = z.infer<typeof userReturnSchema>;

export const userUpdatePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
});

export type TUserUpdatePasswordData = z.infer<typeof userUpdatePasswordSchema>;
