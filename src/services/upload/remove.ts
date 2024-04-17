import { s3 } from "../../client/s3";
import { env } from "../../env";

export const remove = async (key: string) => {
   s3.deleteObject(
      {
         Bucket: env.S3_BUCKET_NAME,
         Key: key,
      },
      () => console.log("File successfully deleted.")
   );
};
