import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from ".prisma/client";
import jwt from "jsonwebtoken";

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

      const token = jwt.sign({ id: user.id }, "secretrp", { expiresIn: "1d" });

      return res.status(200).json({ name: user.name, token });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
export { AuthUserController };
