import { Router } from 'express'
import { ListDriverController, CreateDriverController } from '../controller/'
import { DriverInfoController } from '../controller/driver/DriverInfoController'

const create = new CreateDriverController()
const list = new ListDriverController()
const info = new DriverInfoController()


const driverRoutes = (router: Router): void => {
  router.post('/api/drivers', create.execute.bind(CreateDriverController))
  router.get('/api/drivers', list.execute.bind(ListDriverController))
  router.post('/api/driver-info', info.execute.bind(DriverInfoController))

}

export { driverRoutes }