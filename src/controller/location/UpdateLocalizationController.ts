import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import { prisma } from "../../services/prisma";

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

            const data = jwt.verify(token, env.SECRET_TOKEN);
            const { id } = data as TokenPayload;

            const driver = await prisma.driver.findUnique({
                where: {
                    id: id
                }
            })

            if (!driver) {
                throw new Error('Driver not found!')
            }

            const date = new Date();

            if (lat === '' || long === '') {
                throw new Error('No localization information should be empty.')
            }

            if (isNaN(lat)) {
                throw new Error('lat is not a Number.')
            }

            if (isNaN(long)) {
                throw new Error('long is not a Number.')
            }


            const local = await prisma.localization.findUnique({
                where:{
                    driverID:id
                }
            })

            if(!local){
                throw new Error('Smh went wrong.')
            }

            await prisma.localization.update({
                where:{
                    ID:local.ID
                },data:{
                    lat:Number(lat),
                    long:Number(long),
                    lastUpdated:date
                }
            })


            return res.status(200).json({ message: 'Done!' },)
        } catch (err) {
            return res.status(400).json(err.message)
        }
    }
}

export { UpdateLocalizationController };
