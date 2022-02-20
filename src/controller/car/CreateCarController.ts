import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import {prisma} from '../../services/prisma'
interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class CreateCarController {
  async execute(req: Request, res: Response) {
    try {
      const { token, plate, chassi, renavam, year, model, marca } = req.body;

      const data = jwt.verify(token, env.SECRET_TOKEN);
      const { id } = data as TokenPayload;

      const driver = await prisma.driver.findUnique({
        where: {
          id: id,
        },
      });

      if (!driver) {
        throw new Error("Motorista não encontrado");
      }

      const car = await prisma.car.findUnique({
        where: {
          plate,
        },
      });

      if (car) {
        throw new Error("Carro já cadastrado no sistema!");
      }

      await prisma.car.create({
        data: {
          plate,
          ownerCNH: driver.CNH,
          chassi,
          renavan:renavam,
          year: Number(year),
          model,
          marca,
        },
      });

      await prisma.driver.update({
        where:{
          id: id
        },data:{
          carSigned: true
        }
      })

      return res.status(201).json({
        model,
        plate,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export { CreateCarController };
