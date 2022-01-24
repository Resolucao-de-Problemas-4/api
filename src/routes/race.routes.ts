import { Router } from 'express'
import { ListRaceControllerDriver, ListRaceControllerUser, FindRaceController, CreateRaceController, UpdateRaceController, VerifyRaceFinishController, RaceCancelController, FinishRaceController } from '../controller'
import { VerifyRaceController } from '../controller/race/VerifyRaceController'


const create = new CreateRaceController()
const listD = new ListRaceControllerDriver()
const listU = new ListRaceControllerUser()
const find = new FindRaceController()
const update = new UpdateRaceController()
const cancel = new RaceCancelController()
const verify = new VerifyRaceController()
const finish = new FinishRaceController()
const verifyFinish = new VerifyRaceFinishController()

const raceRoutes = (router: Router): void => {
  router.post('/api/race', create.execute.bind(CreateRaceController))
  router.post('/api/race-search', find.execute.bind(FindRaceController))
  router.post('/api/race-d-list', listD.execute.bind(ListRaceControllerDriver))
  router.post('/api/race-u-list', listU.execute.bind(ListRaceControllerUser))
  router.post('/api/race-update', update.execute.bind(UpdateRaceController));
  router.post('/api/race-cancel', cancel.execute.bind(RaceCancelController));
  router.post('/api/race-verify', verify.execute.bind(VerifyRaceController))
  router.post('/api/race-finish', finish.execute.bind(FinishRaceController))
  router.post('/api/race-verify-finish', verifyFinish.execute.bind(VerifyRaceFinishController))
}

export { raceRoutes }