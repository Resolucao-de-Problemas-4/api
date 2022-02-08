import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";

const prisma = new PrismaClient();

interface TokenPayload {
  id: string;
  rating: number;
  review: string;
}

class CreateRatingController {
  async execute(req: Request, res: Response) {
    const date = new Date();
    try {
      const {
        token,
        idCorrida,
        rating,
        review

      } = req.body;

      const data = jwt.verify(token, env.SECRET_TOKEN);
      const { id } = data as TokenPayload;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const race = await prisma.race.findUnique({
        where: {
          id: idCorrida,
        }
      })

      if (race.avaliacaoViagem) {
        throw new Error("Corrida já foi avaliada")
      }

      const rate = await prisma.rating.create({
        data: {
          rating,
          review,
          idCorrida
        }
      })

      await prisma.race.update({
        where: {
          id: idCorrida,
        }, data: {
          avaliacaoViagem: rate.id,
        }
      })

      return res.status(200).json({ rate });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export { CreateRatingController };