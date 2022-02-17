import { PrismaClient } from ".prisma/client";
import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";

const prisma = new PrismaClient();

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
  }

class GetLocalizationController {
    async execute(req: Request, res: Response) {
        try {

            const {
                token
            } = req.body;

            const date = new Date();

            const data = jwt.verify(token, env.SECRET_TOKEN);
            const { id } = data as TokenPayload;

            const user = await prisma.user.findUnique({
                where:{
                    id
                }
            })

            if(!user){
                throw new Error('User Not Found')
            }

            const localization = await prisma.localization.findUnique({
                where:{
                    userID:id
                }
            })

            if(!localization){
                throw new Error('Localization not found or already finished!')
            }

            delete localization.driverID
            delete localization.corridaID
            delete localization.userID

            return res.status(201).json(localization)
        } catch (err) {
            return res.status(400).json(err.message)
        }
    }
}

export { GetLocalizationController };
