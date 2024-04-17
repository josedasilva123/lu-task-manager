import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../../client/s3";
import { randomUUID } from "node:crypto";
import { TUpload } from "../../schemas/upload.schema";
import { env } from "../../env";

export const sign = async ({ name, contentType }: TUpload) => {
   const fileKey = randomUUID().concat(name);

   const signedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
         Bucket: env.S3_BUCKET_NAME,
         Key: fileKey,
         ContentType: contentType,
      }),
      { expiresIn: 180 }
   );

   return { signedUrl, fileKey };
};
