import { Request, Response } from 'express'
import { prisma } from '../../services/prisma'

class ListDriverController {
    
    
    async execute(request: Request, response: Response): Promise<Response> {
         
        try {
            
            const drivers = await prisma.driver.findMany({
                select:{
                    name: true
                }
            })
            return response.json(drivers)
        } catch (err) {
            return response.status(400).json({
                message: err.message
            })
        }
    }
}
export { ListDriverController }
