import { Router } from 'express'
import { userRoutes } from './user.routes'
import { driverRoutes } from './driver.routes'
import { authUserRoutes } from './authuser.routes'
import { authDriverRoutes } from './authdriver.routes'
import { raceRoutes } from './race.routes'
import { carRoutes } from './car.routes'
import { cardRoutes } from './card.routes'
import { ratingRoutes } from './rating.routes'
import {localizationRoutes} from './localization.routes'


const router = Router()

raceRoutes(router)
authUserRoutes(router)
authDriverRoutes(router)
userRoutes(router)
driverRoutes(router)
carRoutes(router)
cardRoutes(router)
ratingRoutes(router)
localizationRoutes(router)

export { router } 