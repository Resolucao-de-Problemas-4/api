import { Router } from 'express'
import { CreateRaceController } from '../controller/race/CreateRaceController'

const create = new CreateRaceController()


const raceRoutes = (router: Router): void => {
  router.post('/api/race', create.execute.bind(CreateRaceController))
  
}

export { raceRoutes }