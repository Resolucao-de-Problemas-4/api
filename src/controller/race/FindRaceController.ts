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
          corridaAceita: false,
        },
      });

      races.forEach(async (race) => {
        denied.forEach((element) => {
          if (race.id !== element.corridaID) {
            return response.status(200).json(race);
          }
        });
      });

      return response.status(401);

    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
export { FindRaceController };
