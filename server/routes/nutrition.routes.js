import express from 'express'

import nutriionController from '../controllers/nutrition.controller'
import authController from '../controllers/auth.controller'

const routes = express.Router()

routes.get('/by/category', 
authController.isAuthenticated,
nutriionController.getNutritionByCategory)

export default routes