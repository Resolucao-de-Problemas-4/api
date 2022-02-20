import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "process";
import {prisma} from '../../services/prisma'

class AuthDriverController {
  async execute(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const driver = await prisma.driver.findUnique({
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

      const token = jwt.sign({ id: driver.id }, env.SECRET_TOKEN, { expiresIn: "1d" });

      delete driver.password
      delete driver.id


      return res.status(200).json({ driver, token });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
export { AuthDriverController };
