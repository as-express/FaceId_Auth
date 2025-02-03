import { hash, verify } from 'argon2'
import { userModel } from '../user/user.model'
import { ISignIn, ISignUp } from './interface'
import axios from 'axios'
import { tokenGenerator } from '../utils/shared/jwt.util'
import { env } from '../config/env.config'
import { IDataRes, IMessageRes } from './interface/response.interface'

export const signup = async (
  data: ISignUp
): Promise<IMessageRes | IDataRes> => {
  const face_vector = await captureFace()
  if (!face_vector) {
    return {
      status: 400,
      message: 'Failed to capture user face',
    }
  }

  const existingUser = await userModel.findOne({ email: data.email })
  if (existingUser) {
    return {
      status: 400,
      message: 'User is already exist',
    }
  }

  const hashPassword = await hash(data.password)
  const user = new userModel({
    username: data.username,
    email: data.email,
    password: hashPassword,
    face_vector,
  })
  await user.save()

  const token = tokenGenerator(user.id)
  return {
    status: 201,
    data: {
      message: 'User Registration Success',
      token: token,
    },
  }
}

export const signin = async (
  data: ISignIn
): Promise<IMessageRes | IDataRes> => {
  const user = await userModel.findOne({ email: data.email })
  if (!user) {
    return {
      status: 404,
      message: 'User not found with this email',
    }
  }

  const isPasswordValid = await verify(user.password, data.password)
  if (!isPasswordValid) {
    return {
      status: 400,
      message: 'Password is not correct',
    }
  }

  const capturedFaceVector = await captureFace()
  if (!capturedFaceVector) {
    return {
      status: 400,
      message: 'Failed to capture face',
    }
  }

  const isFaceMatch = await compareFaces(user.face_vector, capturedFaceVector)
  if (!isFaceMatch) {
    return {
      status: 400,
      message: 'Face ID does not match',
    }
  }

  const token = tokenGenerator(user.id)
  return {
    status: 200,
    data: {
      message: 'success',
      token: token,
    },
  }
}

const captureFace = async () => {
  try {
    const response = await axios.post(`${env.FLASK_API}/capture`)
    if (response.data.success) {
      return response.data.face_vector
    }
    return null
  } catch (error) {
    console.error('Error In Face Id:', error)
    return null
  }
}

const compareFaces = async (
  savedFaceVector: string,
  providedFaceVector: string
) => {
  try {
    const response = await axios.post(`${env.FLASK_API}/verify`, {
      face_vector: providedFaceVector,
    })
    return response.data.success || false
  } catch (error) {
    console.error('Error in Verify Face', error)
    return false
  }
}
