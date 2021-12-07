import { Router } from 'express'
import { CreateCarController } from '../controller/car/CreateCarController'

const create = new CreateCarController()


const carRoutes = (router: Router): void => {
  router.post('/api/car', create.execute.bind(CreateCarController))
  
}

export { carRoutes }