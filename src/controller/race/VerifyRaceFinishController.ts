import { prisma } from '../../services/prisma'; import { Request, Response } from "express";



class VerifyRaceFinishController {
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
                return response.status(200).json({ corrida });
            }

            throw new Error("ainda não")


        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
export { VerifyRaceFinishController };
