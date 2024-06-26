import { z } from "zod";

export const envSchema = z.object({
   AWS_REGION: z.string().min(1),
   AWS_ACCESS_KEY_ID: z.string().min(1),
   AWS_SECRET_ACCESS_KEY: z.string().min(1),
   DATABASE_URL: z.string().min(1),
   JWT_SECRET: z.string().min(1),
   S3_BUCKET_NAME: z.string().min(1),
   S3_BUCKET_BASE_URL: z.string().min(1).url()
});

export const env = envSchema.parse({
   AWS_REGION: process.env.AWS_REGION,
   AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
   AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
   DATABASE_URL: process.env.DATABASE_URL,
   JWT_SECRET: process.env.JWT_SECRET,
   S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
   S3_BUCKET_BASE_URL: process.env.S3_BUCKET_BASE_URL
});
