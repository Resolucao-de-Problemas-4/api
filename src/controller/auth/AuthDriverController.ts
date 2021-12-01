import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from ".prisma/client";
import jwt from "jsonwebtoken";

const prismaClient = new PrismaClient();

class AuthDriverController {
  async execute(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const driver = await prismaClient.driver.findUnique({
        where: {
          email,
        },
      });

      if (!driver) {
        throw new Error("Email não encontrado");
      }

      const isValidPassword = await bcrypt.compare(password, driver.password);

      if (!isValidPassword) {
        throw new Error("senha errada");
      }

      const token = jwt.sign({ id: driver.id }, "secretrp", { expiresIn: "1d" });

      return res.status(200).json({ name: driver.name, token });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
export { AuthDriverController };
