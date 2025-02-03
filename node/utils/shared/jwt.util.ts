import jwt from 'jsonwebtoken'
import { env } from '../../config/env.config'

export const tokenGenerator = (userId: string) => {
  const token = jwt.sign(
    {
      userId,
    },
    String(env.JWT_SECRET) || 'secret',
    {
      expiresIn: Number(env.JWT_EXPIRE) || 1,
    }
  )

  return token
}
