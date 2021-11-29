import { Router } from 'express'

import { AuthController } from '../controller'

const auth = new AuthController()

const authRoutes = (router: Router): void => {
  router.post('/api/auth', auth.execute.bind(AuthController))
}

export { authRoutes }