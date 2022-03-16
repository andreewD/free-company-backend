import Joi from 'joi'
const idSchema = Joi.string().length(36).required()

export { idSchema }
export * from './user'