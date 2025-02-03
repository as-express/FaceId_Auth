import express from 'express'
import { dbConnection } from './config/db.config'
import { authRoutes } from './auth/router'
import { userRoutes } from './user/router'
import { env } from './config/env.config'

const app = express()
const port = env.PORT | 3000
app.use(express.json())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

dbConnection()
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
