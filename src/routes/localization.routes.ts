import { Router } from 'express'
import { CreateLocalizationController } from '../controller/location'
import { UpdateLocalizationController } from '../controller/location'
import { GetLocalizationController } from '../controller/location'
const create = new CreateLocalizationController()
const update = new UpdateLocalizationController()
const getLocalization = new GetLocalizationController()


const localizationRoutes = (router: Router): void => {
  router.post('/api/localization-create', create.execute.bind(CreateLocalizationController))
  router.post('/api/localization-update', update.execute.bind(UpdateLocalizationController))
  router.post('/api/localization', getLocalization.execute.bind(GetLocalizationController))
}

export { localizationRoutes }