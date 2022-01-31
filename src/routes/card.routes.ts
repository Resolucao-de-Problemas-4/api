import { Router } from 'express'

import { CreateCardController } from '../controller'

const create = new CreateCardController()

const cardRoutes = (router: Router): void => {
  router.post('/api/card-create', create.execute.bind(CreateCardController))
}

export { cardRoutes }