import { Router } from 'express'
import * as controller from './controller'
import { validator } from '../utils/middlewares/joi.middleware'
import { signupSchema } from './schemas/signup.schema'
import { signinSchema } from './schemas/signin.schema'
const router = Router()

router.post('/signup', validator(signupSchema, 'body'), controller.signup)
router.post('/signin', validator(signinSchema, 'body'), controller.signin)

export const authRoutes = router
