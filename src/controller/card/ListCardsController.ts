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

class ListCardsController {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.body;

      const data = jwt.verify(token, env.SECRET_TOKEN);
      const { id } = data as TokenPayload;

      const cards = await prisma.cartao.findMany({
        where: {
          idUsuario: id,
        },
      });

      const user = await prisma.user.findFirst({
        where: {
          id
        },
      });

      if (!user) {
        throw new Error('User not found')
      }
      
      return response.status(200).json(cards);
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
export { ListCardsController };
