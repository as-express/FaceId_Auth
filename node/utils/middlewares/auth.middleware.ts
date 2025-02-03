import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from '../../config/env.config'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number
  }
}

export const authSecurity = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
      res.status(401).json({ message: 'Please provide a token' })
      return
    }

    const token = authorizationHeader.split(' ')[1]
    if (!token) {
      res.status(401).json({ message: 'Token format is incorrect' })
    }

    const decodedToken = jwt.verify(
      token,
      env.JWT_SECRET || 'secret'
    ) as JwtPayload

    if (!decodedToken || !decodedToken.userId) {
      res.status(401).json({ message: 'Invalid token' })
      return
    }

    req.userId = decodedToken.userId
    next()
  } catch (error: any) {
    console.error(error)
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token has expired' })
    }
    res.status(401).json({ message: 'Authentication failed' })
  }
}
