import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { AppError } from "../error/AppError";

export const authenticate = async (
   req: FastifyRequest,
   res: FastifyReply,
   done: HookHandlerDoneFunction
) => {
    try {
        await req.jwtVerify();
        done();    
    } catch (error) {
        console.log(error);
        if(error instanceof Error){
            throw new AppError(error.message, 401);   
        }        
    }
};
