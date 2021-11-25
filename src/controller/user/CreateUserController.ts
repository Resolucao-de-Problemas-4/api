import { PrismaClient } from '.prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

class CreateUserController {
    async execute(request: Request, response: Response) {
        try {
            
            const { customerName, customerAddress, customerEmail, customerPassword, customerBirthday } = request.body
            const birthdate = new Date(customerBirthday);
            
            const userAlreadyExists = await prisma.user.findFirst({
                where: {
                    email: customerEmail
                }
            })

            if (userAlreadyExists) {
                throw new Error('email already in DB')
            }

            await prisma.user.create({
                data: {
                    name: customerName,
                    address: customerAddress,
                    password: customerPassword,
                    birthday: birthdate,
                    email: customerEmail
                }
            })

            return response.status(201).json({
                name:customerName,
                email: customerEmail
              })

        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }
    }
}

export { CreateUserController }