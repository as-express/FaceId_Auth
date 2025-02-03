import { Router } from 'express'
import * as controller from './controller'
import { authSecurity } from '../utils/middlewares/auth.middleware'
const router = Router()

router.get('/profile', authSecurity, controller.profile)

export const userRoutes = router
