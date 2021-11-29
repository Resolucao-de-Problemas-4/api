import {Router} from 'express'
import { userRoutes } from './user.routes'
import { driverRoutes } from './driver.routes'
import { authRoutes } from './auth.routes'
//import { driverRoutes } from './driver.routes'


const router = Router()

authRoutes(router)
userRoutes(router)
driverRoutes(router)

export {router}