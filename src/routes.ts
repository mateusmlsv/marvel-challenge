import { Router } from 'express'

import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateUserController } from './controllers/CreateUserController'

const router = Router()

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateUserController()

router.post('/users', createUserController.handle)
router.post('/login', authenticateController.handle)

export { router }
