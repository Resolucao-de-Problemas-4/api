import { Router } from 'express'

import { AuthDriverController } from '../controller'

const auth = new AuthDriverController()

const authDriverRoutes = (router: Router): void => {
  router.post('/api/authdriver', auth.execute.bind(AuthDriverController))
}

export { authDriverRoutes }