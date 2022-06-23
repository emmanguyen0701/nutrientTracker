
import express from 'express'

import externalAPIController from '../controllers/externalAPI.controller'

const routes = express.Router()


routes.get('/usda', externalAPIController.handleUsdaApiCall)

export default routes