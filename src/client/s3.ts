import { S3, S3Client } from "@aws-sdk/client-s3";
import { env } from "../env";

const params = {
   region: env.AWS_REGION,
   credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
   },
}

export const s3Client = new S3Client(params);

export const s3 = new S3(params)