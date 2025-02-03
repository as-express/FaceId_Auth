import { Request, Response } from 'express'
import * as service from './service'
import { ISignIn, ISignUp } from './interface'

export const signup = async (req: Request, res: Response): Promise<void> => {
  const data: ISignUp = req.body
  const result = await service.signup(data)

  res
    .status(result.status)
    .json('data' in result ? result.data : { message: result.message })
}

export const signin = async (req: Request, res: Response): Promise<void> => {
  const data: ISignIn = req.body
  const result = await service.signin(data)

  res
    .status(result.status)
    .json('data' in result ? result.data : { message: result.message })
}
