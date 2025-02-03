import Joi from 'joi'

export const signupSchema = Joi.object({
  username: Joi.string().min(3).max(40).required().messages({
    'string.empty': 'username is required',
    'string.min': 'username must be at least 3 characters',
    'string.max': 'username cannot exceed 40 characters',
  }),
  email: Joi.string().min(3).max(40).email().required().messages({
    'string.empty': 'email is required',
    'string.min': 'email must be at least 3 characters',
    'string.max': 'email cannot exceed 40 characters',
  }),
  password: Joi.string().min(8).max(12).required().messages({
    'string.empty': 'email is required',
    'string.min': 'email must be at least 8 characters',
    'string.max': 'email cannot exceed 12 characters',
  }),
})
