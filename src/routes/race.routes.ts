import { Router } from 'express'
import { ListDriverController, ListRaceControllerDriver, ListRaceControllerUser } from '../controller'
import { CreateRaceController } from '../controller/race/CreateRaceController'

const create = new CreateRaceController()
const listD = new ListRaceControllerDriver()
const listU = new ListRaceControllerUser()

const raceRoutes = (router: Router): void => {
  router.post('/api/race', create.execute.bind(CreateRaceController))
  router.post('/api/race-d-list', listD.execute.bind(ListRaceControllerDriver))
  router.post('/api/race-u-list', listU.execute.bind(ListRaceControllerUser) )
}

export { raceRoutes }