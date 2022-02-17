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

class CreateLocalizationController {
    async execute(req: Request, res: Response) {
        try {

            const {
                token,
                lat,
                long,
                corridaID,

            } = req.body;

            const date = new Date();

            if (corridaID === '') {
                throw new Error('CorridaID is null')
            }

            if (lat === '' || long === '') {
                throw new Error('Both lat and long must be numbers and NOT null')
            }

            if(isNaN(lat)){
                throw new Error('lat is not a Number.')
            }

            if(isNaN(long)){
                throw new Error('long is not a Number.')
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

            const race = await prisma.race.findUnique({
                where: {
                    id: corridaID
                }
            })

            if (!race) {
                throw new Error('Race not found!')

            }


            await prisma.localization.create({
                data: {
                    lat:Number(lat),
                    long: Number(long),
                    driverID: id,
                    corridaID,
                    userID: race.idCliente,
                    lastUpdated: date
                }
            })

            return res.status(201).json({ message: 'Done!' })
        } catch (err) {
            return res.status(400).json(err.message)
        }
    }
}

export { CreateLocalizationController };
