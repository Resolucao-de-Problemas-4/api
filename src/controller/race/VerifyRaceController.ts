import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class VerifyRaceController {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const { idCorrida } = request.body;

      const corrida = await prisma.race.findFirst({
        where: { id: idCorrida },
      });

      if (!corrida) {
        throw new Error("Corrida não encontrada");
      }

      if (corrida.corridaAceita === true) {
        const motorista = await prisma.driver.findFirst({
          where: {
            id: corrida.idDriver,
          },
        });

        const carro = await prisma.car.findFirst({
          where: {
            ownerCNH: motorista.CNH,
          },
        });

        return response.status(200).json({ nome: motorista.name, carro });
      } else{
          return response.status(201).json('Ainda não')
      }
    } catch (error) {
        return response.status(400).json('Corrida não encontrada')
    }
  }
}
export { VerifyRaceController };
