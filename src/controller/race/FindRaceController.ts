import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class FindRaceController {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.body;

      const { denied } = request.body;

      const data = jwt.verify(token, "secretrp");
      const { id } = data as TokenPayload;

      const races = await prisma.race.findMany({
        where: {
          AND: {
            corridaAceita: { equals: false },
            corridaCancelada: { equals: false }
          },
        },
      });

      races.forEach((race) => {
        let count = 0;

        denied.forEach((element) => {
          if (race.id === element.corridaID) {
            count++;
          }
        });

        if (count === 0) {
          return response.status(200).json(race);
        }
      });

      return response.status(201).json("NENHUMA CORRIDA NO MOMENTO");
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
export { FindRaceController };
