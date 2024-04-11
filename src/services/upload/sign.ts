import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../client/s3";
import { randomUUID } from "node:crypto";
import { TUpload } from "../../schemas/upload.schema";

export const sign = async ({ name, contentType }: TUpload) => {
   const fileKey = randomUUID().concat(name);

   const signedUrl = await getSignedUrl(
      s3,
      new PutObjectCommand({
         Bucket: "example",
         Key: fileKey,
         ContentType: contentType,
      }),
      { expiresIn: 180 }
   );

   return { signedUrl, fileKey };
};
