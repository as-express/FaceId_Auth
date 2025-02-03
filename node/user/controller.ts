import { Request, Response } from 'express'
import * as service from './service'

export const profile = async (req: Request, res: Response) => {
  const result = await service.profile(String(req.userId))
  res.status(result.status).json(result.data)
}
