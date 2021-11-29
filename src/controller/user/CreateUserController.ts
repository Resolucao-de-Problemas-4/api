import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class CreateUserController {
  async execute(request: Request, response: Response) {
    try {
      console.log(request.body);

      const {
        customerName,
        customerAddress,
        customerEmail,
        customerPassword,
        customerBirthday,
      } = request.body;
     

      const userAlreadyExists = await prisma.user.findFirst({
        where: {
          email: customerEmail,
        },
      });

      if (userAlreadyExists) {
        throw new Error("email already in DB");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(customerPassword, salt);

      await prisma.user.create({
        data: {
          name: customerName,
          address: customerAddress,
          password: hashPassword,
          birthday: customerBirthday,
          email: customerEmail,
        },
      });

      return response.status(201).json({
        name: customerName,
        email: customerEmail,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { CreateUserController };
