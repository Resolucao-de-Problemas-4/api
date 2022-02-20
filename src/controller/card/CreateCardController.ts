import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { env } from "process";
import {prisma} from '../../services/prisma'
interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}
class CreateCardController {
  async execute(request: Request, response: Response) {

    try {
      const {
        number,
        cvv,
        dateCard,
        name,
        token,
      } = request.body;

      console.log(request.body)

      const cardV = await prisma.cartao.findUnique({
        where:{
          numero:number
        }
      })

      if(cardV){
        throw new Error('Card already in db')
      }

      const data = jwt.verify(token, env.SECRET_TOKEN);
      const { id } = data as TokenPayload;

      const user = await prisma.user.findFirst({
        where: {
          id
        },
      });

      if (!user) {
        throw new Error('User not found')
      }

      const salt = bcrypt.genSaltSync(10);
      const hashCVV = bcrypt.hashSync(cvv, salt);

      const card = await prisma.cartao.create({
        data: {
          numero: number,
          cvv: hashCVV,
          dataValidade: dateCard,
          nome: name,
          idUsuario: id
        }
      })

      delete card.cvv

      return response.status(201).json({ card})
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { CreateCardController };
