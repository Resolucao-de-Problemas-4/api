import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";

const prisma = new PrismaClient();

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

class ChangeRouteController {
    async execute(req: Request, res: Response) {
        try {

            const {
                token,


            } = req.body;

            if (token === '' || token === null) {
                throw new Error('Token null.')

            }



            const data = jwt.verify(token, env.SECRET_TOKEN);
            const { id } = data as TokenPayload;

            const driver = await prisma.driver.findUnique({
                where: {
                    id
                }
            })

            if (!driver) {
                throw new Error('Driver not found!')
            }

            const local = await prisma.localization.findUnique({
                where: {
                    driverID: id
                }
            })

            if (local.route === 2) {
                throw new Error('Route already changed.')
            }

            await prisma.localization.update({
                where: {
                    driverID: id
                }, data: {
                    route: 2
                }
            })


            return res.status(200).json({ message: 'Done!' })
        } catch (err) {
            return res.status(400).json(err.message)
        }
    }
}

export { ChangeRouteController };
