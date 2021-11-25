import {Router} from 'express'
import { userRoutes } from './user.routes'
import { driverRoutes } from './driver.routes'
//import { driverRoutes } from './driver.routes'


const router = Router()

userRoutes(router)
driverRoutes(router)

export {router}