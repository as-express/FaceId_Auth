import express from 'express'
import { dbConnection } from './config/db.config'
import { authRoutes } from './auth/router'
import { userRoutes } from './user/router'

const app = express()
const port = 3000
app.use(express.json())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

dbConnection()
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
