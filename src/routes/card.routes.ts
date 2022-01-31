import { Router } from 'express'

import { CreateCardController, ListCardsController } from '../controller'

const create = new CreateCardController()
const list = new ListCardsController()

const cardRoutes = (router: Router): void => {
  router.post('/api/card-create', create.execute.bind(CreateCardController))
  router.post('/api/card-list', list.execute.bind(ListCardsController))
}

export { cardRoutes }