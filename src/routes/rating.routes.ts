import { Router } from 'express'
import { CreateRatingController } from '../controller/rating/CreateRatingController'

const create = new CreateRatingController()

const ratingRoutes = (router: Router): void => {
    router.post('/api/rating', create.execute.bind(CreateRatingController))
}

export { ratingRoutes }