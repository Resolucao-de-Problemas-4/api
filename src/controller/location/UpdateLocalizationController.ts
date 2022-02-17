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

class UpdateLocalizationController {
    async execute(req: Request, res: Response) {
        try {

            const {
                token,
                lat,
                long,

            } = req.body;

            const date = new Date();

            if (lat === '' || long === '') {
                throw new Error('No localization information should be empty.')
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

            await prisma.localization.update({
                where: {
                    driverID: id
                }, data: {
                    lat,
                    long,
                    lastUpdated: date
                }
            })


            return res.status(200).json({ message: 'Done!' })
        } catch (err) {
            return res.status(400).json(err.message)
        }
    }
}

export { UpdateLocalizationController };
