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

class CreateRaceController {
  async execute(req: Request, res: Response) {
    const date = new Date();
    try {
      const {
        token,
        longitudeOrigem,
        latitudeOrigem,
        longitudeFinal,
        latitudeFinal,
        preco,
        destinoFinal
      } = req.body;

      console.log(req.body)

      const hour = date.getHours() + ":" + date.getMinutes();

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

      const corrida = await prisma.race.create({
        data: {
          idCliente: id,
          dataViagem: date,
          horaSolicitacao: hour,
          latitudeOrigem: latitudeOrigem,
          longitudeOrigem: longitudeOrigem,
          latitudeFinal: latitudeFinal,
          longitudeFinal: longitudeFinal,
          valorViagem: Number(preco),
          destinoFinal: destinoFinal
        },
      });

      return res.status(200).json({corridaID:corrida.id});
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export { CreateRaceController };
