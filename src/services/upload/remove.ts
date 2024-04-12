import { s3 } from "../../client/s3";

export const remove = async (key: string) => {
   s3.deleteObject(
      {
         Bucket: "example",
         Key: key,
      },
      () => console.log("File successfully deleted.")
   );
};
