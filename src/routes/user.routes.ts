import { Router } from 'express'
import { CreateUserController, ListUserController, UserInfoController } from '../controller/user/'

const create = new CreateUserController()
const list = new ListUserController()
const info = new UserInfoController()

const userRoutes = (router: Router): void => {
  router.post('/api/users', create.execute.bind(CreateUserController))
  router.get('/api/users', list.execute.bind(ListUserController))
  router.post('/api/user-info', info.execute.bind(UserInfoController))
}

export { userRoutes }
