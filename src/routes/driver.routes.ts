import { Router } from 'express'
import { ListDriverController } from '../controller/'

const list = new ListDriverController()

const driverRoutes = (router: Router): void => {
 // router.post('/api/driver', create.execute.bind(CreateDriverController))
  router.get('/api/drivers', list.execute.bind(ListDriverController))
 
}

export { driverRoutes }