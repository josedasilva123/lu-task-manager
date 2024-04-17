import { FastifyInstance } from "fastify";
import { validateBody } from "../hooks/validateBody";
import { TFileCreateData, TFilePostData, filePostSchema } from "../schemas/file.schema";
import { fileService } from "../services/file/_index";
import { uploadService } from "../services/upload/_index";
import { env } from "../env";
import { AppError } from "../error/AppError";

interface Params {
   id: string;
}

export const fileControllers = async (fastify: FastifyInstance) => {
   fastify.post<{ Body: TFilePostData }>(
      "/",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, filePostSchema);
         },
      },
      async (req, res) => {
         const sign = await uploadService.sign({
            name: req.body.name,
            contentType: req.body.contentType,
         });

         const data: TFileCreateData = {
            name: req.body.name,
            key: sign.fileKey,
            url: `${env.S3_BUCKET_BASE_URL}${sign.fileKey}`,
         };

         const file = await fileService.create(data);

         return res.status(201).send({ file, signedUrl: sign.signedUrl });
      }
   );

   fastify.get("/", async (req, res) => {
      const response = await fileService.getMany();

      return res.status(200).send(response);
   });

   fastify.delete<{ Params: Params }>("/:id", async (req, res) => {
      const file = await fileService.getOne(req.params.id);

      if (!file) {
         throw new AppError("File not found.", 404);
      }

      await uploadService.remove(file.key);

      await fileService.remove(file.id);

      return res.status(204).send();
   });
};
