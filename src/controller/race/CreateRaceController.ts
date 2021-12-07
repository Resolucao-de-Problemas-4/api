import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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
      } = req.body;

      const hour = date.getHours() + ":" + date.getMinutes();

      const data = jwt.verify(token, "secretrp");
      const { id } = data as TokenPayload;

      const user = await prisma.user.findUnique({
        where:{
          id: Number(id)
        }
      })

      if(!user){
        throw new Error("Usuário não encontrado")
      }


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

      return res.status(200).json("Corrida Criada!");
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export { CreateRaceController };
