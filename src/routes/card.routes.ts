import { Router } from 'express'

import { CreateCardController, ListCardsController, DeleteCardController } from '../controller'

const create = new CreateCardController()
const list = new ListCardsController()
const remove = new DeleteCardController()

const cardRoutes = (router: Router): void => {
  router.post('/api/card-create', create.execute.bind(CreateCardController))
  router.post('/api/card-list', list.execute.bind(ListCardsController))
  router.post('/api/card-delete', remove.execute.bind(DeleteCardController))
}

export { cardRoutes }