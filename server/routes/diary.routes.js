import express from 'express'

import diaryController from '../controllers/diary.controller'
import authController from '../controllers/auth.controller'
import userController from '../controllers/user.controller'

const routes = express.Router()

routes.get('/:userId', 
authController.isAuthenticated,
diaryController.getDiary)

routes.post('/', 
authController.isAuthenticated,
diaryController.addFoodToDiary)

routes.delete('/:userId/:itemId', 
authController.isAuthenticated,
authController.hasAuthorization,
diaryController.deleteItem)

routes.param('userId', userController.getUserById)

export default routes

