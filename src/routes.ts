import { Router } from 'express'

import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateUserController } from './controllers/CreateUserController'
import { UpdateUserController } from './controllers/UpdateUserController'

import { CreateFavoriteController } from './controllers/CreateFavoriteController'

import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateUserController()
const updateUserController = new UpdateUserController()
const createFavoriteController = new CreateFavoriteController()

router.post('/users', createUserController.handle)
router.put('/users', ensureAuthenticated, updateUserController.handle)

router.post('/favorites', ensureAuthenticated, createFavoriteController.handle)

router.post('/login', authenticateController.handle)

export { router }
