import {Router} from 'express'
import { userRoutes } from './user.routes'
import { driverRoutes } from './driver.routes'
import { authUserRoutes } from './authuser.routes'
import { authDriverRoutes } from './authdriver.routes'
import { raceRoutes } from './race.routes'
import { carRoutes } from './car.routes'
import { cardRoutes } from './card.routes'


const router = Router()

raceRoutes(router)
authUserRoutes(router)
authDriverRoutes(router)
userRoutes(router)
driverRoutes(router)
carRoutes(router)
cardRoutes(router)
export {router}