import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import { prisma } from "../../services/prisma";
interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

class DriverInfoController {

    async execute(request: Request, response: Response): Promise<Response> {

        try {

            const { token } = request.body;
            const data = jwt.verify(token, env.SECRET_TOKEN);
            const { id } = data as TokenPayload;

            const user = await prisma.driver.findUnique({
                where: {
                    id
                }
            })
            return response.json(user)
        } catch (err) {
            return response.status(400).json({
                message: err.message
            })
        }
    }
}
export { DriverInfoController }
