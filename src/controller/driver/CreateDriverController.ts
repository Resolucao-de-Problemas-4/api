import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../services/prisma";

class CreateDriverController {
  async execute(request: Request, response: Response) {

    try {
      const {
        driverName,
        driverCNH,
        driverAddress,
        driverEmail,
        driverPassword,
      } = request.body;

      const driverAlreadyExists = await prisma.driver.findFirst({
        where: {
          OR: [
            {
              email: {
                equals: driverEmail,
              },
              CNH: {
                equals: driverCNH,
              },
            },
          ],
        },
      });

      if (driverAlreadyExists) {
        throw new Error("CNH or email already in DB");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(driverPassword, salt);

      await prisma.driver.create({
        data: {
          name: driverName,
          CNH: driverCNH,
          address: driverAddress,
          phoneNumber: "992729281",
          email: driverEmail,
          password: hashPassword,
          car: undefined,
        },
      });

      return response.status(201).json({
        name: driverName,
        email: driverEmail,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { CreateDriverController };
