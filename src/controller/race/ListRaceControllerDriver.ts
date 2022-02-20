import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import { prisma } from "../../services/prisma";
interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class ListRaceControllerDriver {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.body;

      const data = jwt.verify(token, env.SECRET_TOKEN);
      const { id } = data as TokenPayload;

      const races = await prisma.race.findMany({
        where: {
          idDriver: id,
        },
      });
      return response.status(200).json(races);
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
export { ListRaceControllerDriver };
