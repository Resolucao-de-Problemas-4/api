import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from ".prisma/client";
import jwt from "jsonwebtoken";
import { env } from "process";

const prismaClient = new PrismaClient();

class AuthUserController {
  async execute(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("Email não encontrado");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("senha errada");
      }

      const corrida = await prismaClient.race.findFirst({
        where: {
          AND: {
            idCliente: user.id,
            corridaCancelada: false,
            viagemConcluida: false
          }
        }
      })

      const token = jwt.sign({ id: user.id }, env.SECRET_TOKEN, { expiresIn: "1d" });

      delete user.password
      delete user.id

      return res.status(200).json({ user, token, corrida });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
export { AuthUserController };
