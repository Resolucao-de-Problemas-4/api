import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface TokenPayload {
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
      } = req.body;

      const hour = date.getHours() + ":" + date.getMinutes();

      const data = jwt.verify(token, "secretrp");
      const { id } = data as TokenPayload;

      await prisma.race.create({
        data: {
          idCliente: Number(id),
          dataViagem: date,
          horaSolicitacao: hour,
          latitudeOrigem: latitudeOrigem,
          longitudeOrigem: longitudeOrigem,
          latitudeFinal: latitudeFinal,
          longitudeFinal: longitudeFinal,
        },
      });

      return res.sendStatus(200).json("HELLO WORLD");
    } catch (error) {
      return res.sendStatus(400).json({ error });
    }
  }
}

export { CreateRaceController };
