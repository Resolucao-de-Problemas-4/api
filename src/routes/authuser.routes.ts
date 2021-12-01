import { Router } from 'express'

import { AuthUserController } from '../controller'

const auth = new AuthUserController()

const authUserRoutes = (router: Router): void => {
  router.post('/api/authuser', auth.execute.bind(AuthUserController))
}

export { authUserRoutes }