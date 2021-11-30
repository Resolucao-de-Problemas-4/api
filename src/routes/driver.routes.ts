import { Router } from 'express'
import { ListDriverController, CreateDriverController } from '../controller/'

const create = new CreateDriverController()
const list = new ListDriverController()

const driverRoutes = (router: Router): void => {
  router.post('/api/drivers', create.execute.bind(CreateDriverController))
  router.get('/api/drivers', list.execute.bind(ListDriverController))
}

export { driverRoutes }