import { Router } from 'express'
import { ListRaceControllerDriver, ListRaceControllerUser, FindRaceController, CreateRaceController, UpdateRaceController } from '../controller'


const create = new CreateRaceController()
const listD = new ListRaceControllerDriver()
const listU = new ListRaceControllerUser()
const find = new FindRaceController()
const update = new UpdateRaceController()

const raceRoutes = (router: Router): void => {
  router.post('/api/race', create.execute.bind(CreateRaceController))
  router.post('/api/race-search', find.execute.bind(FindRaceController))
  router.post('/api/race-d-list', listD.execute.bind(ListRaceControllerDriver))
  router.post('/api/race-u-list', listU.execute.bind(ListRaceControllerUser) )
  router.post('/api/race-update', update.execute.bind(UpdateRaceController));
}

export { raceRoutes }