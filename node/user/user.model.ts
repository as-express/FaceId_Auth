import mongoose from 'mongoose'

const User = new mongoose.Schema({
  username: { type: String, required: true },
  face_vector: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const userModel = mongoose.model('User', User)
