import {Router} from 'express'
import { userRoutes } from './user.routes'
import { driverRoutes } from './driver.routes'
import { authUserRoutes } from './authuser.routes'
import { authDriverRoutes } from './authdriver.routes'


const router = Router()

authUserRoutes(router)
authDriverRoutes(router)
userRoutes(router)
driverRoutes(router)

export {router}