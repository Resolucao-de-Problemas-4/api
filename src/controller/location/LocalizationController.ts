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

class LocalizationController {
    async execute(req: Request, res: Response) {
        try {

            


        } catch (err) { }
    }
}

export { LocalizationController };
