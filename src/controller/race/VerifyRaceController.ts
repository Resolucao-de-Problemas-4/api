import {prisma} from '../../services/prisma'; import { Request, Response } from "express";



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

      if (corrida.viagemConcluida === true) {
        throw new Error("Corrida Finalizada!");
      }

      if (corrida.corridaCancelada === true) {
        throw new Error("Corrida cancelada");
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

        const user = await prisma.user.findFirst({
          where: {
            id: corrida.idCliente,
          },
        });

        delete motorista.password;
        delete motorista.carSigned;
        delete motorista.CNH;
        delete motorista.address;
        delete motorista.status;
        delete motorista.id;

        delete carro.ownerCNH;
        delete carro.chassi;
        delete carro.status;

        delete user.id;
        delete user.password;
        delete user.birthday;
        delete user.address;

        return response.status(200).json({ corrida, motorista, carro, user });
      } else {
        return response.status(201).json("Ainda não");
      }
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
export { VerifyRaceController };
