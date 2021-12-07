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

      const hour = '14:30';
      console.log(hour);

      const data = jwt.verify(token, "secretrp");
      const { id } = data as TokenPayload;

      console.log(id);

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
    } catch {
      return res.status(401).json("Invalid token");
    }
  }
  catch(error) {
    error.message;
  }
}

export { CreateRaceController };
