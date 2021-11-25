import { Router } from 'express'
import {CreateUserController, ListUserController} from '../controller/'


const create = new CreateUserController()
const list = new ListUserController()

const userRoutes = (router: Router): void => {
  router.post('/api/users', create.execute.bind(CreateUserController))
  router.get('/api/users', list.execute.bind(ListUserController))
 
}

export { userRoutes }
