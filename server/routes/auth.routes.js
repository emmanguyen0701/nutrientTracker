import express from 'express'

import authController from '../controllers/auth.controller'

const routes = express.Router()

routes.post('/signin', authController.postSignin)

routes.get('/signout', authController.signout)

export default routes