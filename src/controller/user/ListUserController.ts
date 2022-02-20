import { Request, Response } from 'express'
import { prisma } from '../../services/prisma'

class ListUserController {
    
    
    async execute(request: Request, response: Response): Promise<Response> {
        
        try {
            const users = await prisma.user.findMany({
                select:{
                    name: true       
                }
            })
            return response.json(users)
        } catch (err) {
            return response.status(400).json({
                message: err.message
            })
        }
    }
}
export { ListUserController }
