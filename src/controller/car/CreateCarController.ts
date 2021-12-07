import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class CreateCarController {
  async execute(req: Request, res: Response) {
    try {
      const { token, plate, chassi, renavan, year, model, marca } = req.body;

      const data = jwt.verify(token, "secretrp");
      const { id } = data as TokenPayload;

      const driver = await prisma.driver.findUnique({
        where: {
          id: Number(id),
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
          renavan,
          year: Number(year),
          model,
          marca,
        },
      });
      return res.status(200).json({
        model,
        plate,
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export { CreateCarController };
