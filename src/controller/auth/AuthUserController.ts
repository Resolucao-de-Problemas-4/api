import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "process";
import {prisma} from '../../services/prisma'

class AuthUserController {
  async execute(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
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

      const corrida = await prisma.race.findFirst({
        where: {
          AND: {
            idCliente: user.id,
            corridaCancelada: false,
            viagemConcluida: false
          }
        }
      })
      
      const token = jwt.sign({ id: user.id }, env.SECRET_TOKEN, { expiresIn: "1d" });
      
      if(corrida !== null){
        if(corrida.corridaAceita === true){
          
          const motorista = await prisma.driver.findFirst({
            where: {
              id: corrida.idDriver
            }
          })

          const carro = await prisma.car.findFirst({
            where: {
              ownerCNH: motorista.CNH
            }
          })
          
          delete motorista.password;
          delete motorista.carSigned;
          delete motorista.CNH;
          delete motorista.address;
          delete motorista.status;
          delete motorista.id;
          
          delete carro.ownerCNH;
          delete carro.chassi;
          delete carro.status;
          
          delete user.password
          delete user.id
          delete corrida.horaFinal
          delete corrida.horaInicial
          delete corrida.idDriver
    
          delete user.id;
          delete user.password;
          delete user.birthday;
          delete user.address;

          return res.status(200).json({ user, token, corrida, carro, motorista });
        } else {
          await prisma.race.update({
            where: {
              id: corrida.id
            },
            data: { 
              corridaCancelada: true,
              viagemConcluida: true
            },
          })
          return res.status(200).json({ user, token, corrida});
        }
      }
        return res.status(200).json({ user, token, corrida});
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
export { AuthUserController };
