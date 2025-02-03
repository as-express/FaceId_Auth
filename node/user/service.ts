import { IDataRes } from '../auth/interface/response.interface'
import { userModel } from './user.model'

export const profile = async (userId: string): Promise<IDataRes> => {
  const user = await userModel.findById(userId).select('-face_vector -password')
  return {
    status: 200,
    data: { user },
  }
}
