import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
const prisma = new PrismaClient();

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class DeleteCardController {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { 
        ID,
        token
       } = request.body;

      const data = jwt.verify(token, env.SECRET_TOKEN);
      const { id } = data as TokenPayload;

      const user = await prisma.user.findFirst({
        where: {
          id
        },
      });

      if (!user) {
        throw new Error('User not found')
      }

      const card = await prisma.cartao.findUnique({
          where: {
            ID
          }
      })
      if (card){
          await prisma.cartao.delete({
              where: {
                  ID
              }
          })
      } else {
          throw new Error('Card not found')
      }
      
      return response.status(200).json({message:'Excluído!'});
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
export { DeleteCardController };
